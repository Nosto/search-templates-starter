import { SerpElement } from "@nosto/search-js/preact/serp"
import { cl } from "@nosto/search-js/utils"
import type { Product } from "@/types"
import { renderRatingStars } from "./renderRatingStars"
import ProductImage from "./ProductImage"
import QuickAdd from "../QuickAdd/QuickAdd"
import { useMemo } from "preact/hooks"

type Props = {
  product: Product
  children?: preact.JSX.Element | preact.JSX.Element[]
  showAltOnHover?: boolean
}

/**
 * Renders a product search result. Keep the SerpElement wrapper in place so Nosto search analytics can track product clicks.
 */
export default function Product({ product, children, showAltOnHover = true }: Props) {
  const hasAlternateImage = showAltOnHover && product.alternateImageUrls && product.alternateImageUrls.length > 0
  const isNew = useMemo(
    () => product.datePublished && product.datePublished >= Date.now() - 14 * 24 * 60 * 60 * 1000,
    [product.datePublished]
  )
  const isOnSale = product.listPrice && product.price && product.listPrice > product.price
  const isSkeleton = product.tags1?.includes("skeleton")

  return (
    <SerpElement
      as="a"
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        "aria-label": `Product ${product.name}`,
        className: cl(
          "relative box-border w-full max-w-full flex-[0_0_100%] p-[var(--ns-space-2)] text-inherit no-underline",
          hasAlternateImage && "group",
          isSkeleton && "pointer-events-none"
        ),
        href: product.url
      }}
    >
      <div className={"relative"}>
        <ProductImage
          src={product.imageUrl!}
          alt={product.name}
          className={
            "h-auto w-full aspect-[var(--ns-aspect-ratio)] transition-opacity duration-300 ease-in-out [@supports(selector(::part(img)))]:[&::part(img)]:aspect-[var(--ns-aspect-ratio)]"
          }
        />
        {hasAlternateImage && (
          <ProductImage
            src={product.alternateImageUrls![0]}
            alt={product.name}
            className={cl(
              "h-auto w-full aspect-[var(--ns-aspect-ratio)] transition-opacity duration-300 ease-in-out [@supports(selector(::part(img)))]:[&::part(img)]:aspect-[var(--ns-aspect-ratio)]",
              "absolute left-0 top-0 opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
            )}
          />
        )}
        {isNew && !isOnSale && (
          <div
            className={
              "absolute left-2 top-2 z-[1] bg-[var(--ns-color-white)] p-2 text-center text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]"
            }
          >
            New
          </div>
        )}
        {isOnSale && (
          <div
            className={
              "absolute left-2 top-2 z-[1] bg-[var(--ns-color-red)] p-2 text-center text-[length:var(--ns-font-size-4)] text-[var(--ns-color-white)]"
            }
          >
            Sale
          </div>
        )}
        <QuickAdd
          product={product}
          className={
            "absolute bottom-2 left-2 z-[1] block cursor-pointer border-0 bg-[var(--ns-color-white)] p-2 text-center text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)] [@media(hover:hover)_and_(pointer:fine)]:hidden [@media(hover:hover)_and_(pointer:fine)]:group-hover:block"
          }
        >
          Add to cart
        </QuickAdd>
      </div>
      <div
        className={
          "relative mt-[var(--ns-space-2)] [&>div]:!mb-[var(--ns-space-1)] [&>div]:text-[length:var(--ns-font-size-4)] [&>div]:text-[var(--ns-color-black)]"
        }
        data-nosto-element="product"
      >
        {product.brand && (
          <div
            className={
              "animate-shimmer rounded-[var(--ns-border-radius-3)] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] text-transparent"
            }
          >
            {product.brand}
          </div>
        )}
        <div
          className={
            "animate-shimmer rounded-[var(--ns-border-radius-3)] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] text-transparent"
          }
        >
          {product.name}
        </div>
        <div
          className={
            "animate-shimmer rounded-[var(--ns-border-radius-3)] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] text-transparent"
          }
          aria-label="Price"
        >
          <span>{product.priceText}</span>
          {isOnSale && <span className={"ml-[var(--ns-space-2)] line-through"}>{product.listPriceText}</span>}
        </div>
        {product.ratingValue !== undefined && product.reviewCount ? (
          <div
            className={
              "animate-shimmer rounded-[var(--ns-border-radius-3)] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] text-transparent"
            }
            aria-label={`${product.ratingValue} out of 5 stars, ${product.reviewCount} reviews`}
          >
            {renderRatingStars(product.ratingValue)} {product.ratingValue}
          </div>
        ) : null}
      </div>
      {children}
    </SerpElement>
  )
}
