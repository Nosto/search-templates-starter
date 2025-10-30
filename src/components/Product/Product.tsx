import { SerpElement } from "@nosto/search-js/preact/serp"
import { cl } from "@nosto/search-js/utils"
import type { Product } from "@/types"
import { renderRatingStars } from "./renderRatingStars"
import ProductImage from "./ProductImage"
import QuickAdd from "../QuickAdd/QuickAdd"

type Props = {
  product: Product
  children?: preact.JSX.Element | preact.JSX.Element[]
  showAltOnHover?: boolean
}

export default function Product({ product, children, showAltOnHover = true }: Props) {
  const hasAlternateImage = showAltOnHover && product.alternateImageUrls && product.alternateImageUrls.length > 0
  const isNew = product.datePublished && product.datePublished >= Date.now() - 14 * 24 * 60 * 60 * 1000
  const isOnSale = product.listPrice && product.price && product.listPrice > product.price

  return (
    <SerpElement
      as="a"
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        "aria-label": `Product ${product.name}`,
        className: cl("p-ns-2 box-border flex-[0_0_100%] max-w-full relative w-full no-underline", hasAlternateImage && "group"),
        href: product.url
      }}
    >
      <div className="relative">
        <ProductImage src={product.imageUrl!} alt={product.name} className="h-auto w-full transition-opacity duration-ns ease-ns" />
        {hasAlternateImage && (
          <ProductImage src={product.alternateImageUrls![0]} alt={product.name} className="absolute top-0 left-0 h-auto w-full opacity-0 group-hover:opacity-100 transition-opacity duration-ns ease-ns" />
        )}
        {isNew && !isOnSale && <div className="absolute top-[8px] left-[8px] bg-ns-white text-ns-black text-ns-4 p-[8px] z-[1] text-center">New</div>}
        {isOnSale && <div className="absolute top-[8px] left-[8px] bg-ns-red text-ns-white text-ns-4 p-[8px] z-[1] text-center">Sale</div>}
        <QuickAdd product={product} className="absolute bottom-[8px] left-[8px] bg-ns-white text-ns-black text-ns-4 p-[8px] z-[1] text-center border-none cursor-pointer hidden group-hover:block">
          Add to cart
        </QuickAdd>
      </div>
      <div className="relative mt-ns-2" data-nosto-element="product">
        {product.brand && <div className="text-ns-black text-ns-4 !mb-ns-1">{product.brand}</div>}
        <div className="text-ns-black text-ns-4 !mb-ns-1">{product.name}</div>
        <div aria-label="Price" className="text-ns-black text-ns-4 !mb-ns-1">
          <span>{product.priceText}</span>
          {isOnSale && <span className="line-through ml-ns-2">{product.listPriceText}</span>}
        </div>
        {product.ratingValue !== undefined && product.reviewCount ? (
          <div aria-label={`${product.ratingValue} out of 5 stars, ${product.reviewCount} reviews`} className="text-ns-black text-ns-4 !mb-ns-1">
            {renderRatingStars(product.ratingValue)} {product.ratingValue}
          </div>
        ) : null}
      </div>
      {children}
    </SerpElement>
  )
}
