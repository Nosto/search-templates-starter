import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"
import { cl } from "@nosto/search-js/utils"

/**
 * Renders a Shopify dynamic-card product search result. Keep the SerpElement wrapper in place so Nosto search analytics can track product clicks.
 */
export default function DynamicCardProduct({ product }: { product: Product }) {
  const isSkeleton = product.tags1?.includes("skeleton")

  if (isSkeleton) {
    return (
      <div
        className={cl(
          "relative box-border w-full max-w-full flex-[0_0_100%] p-[var(--ns-space-2)] text-inherit no-underline",
          "pointer-events-none"
        )}
        aria-label={`Product ${product.name}`}
      >
        <div className={"relative"}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={
              "h-auto w-full aspect-[var(--ns-aspect-ratio)] transition-opacity duration-300 ease-in-out [@supports(selector(::part(img)))]:[&::part(img)]:aspect-[var(--ns-aspect-ratio)]"
            }
          />
        </div>
        <div
          className={
            "relative mt-[var(--ns-space-2)] [&>div]:!mb-[var(--ns-space-1)] [&>div]:text-[length:var(--ns-font-size-4)] [&>div]:text-[var(--ns-color-black)]"
          }
        >
          <div
            className={
              "animate-shimmer rounded-[var(--ns-border-radius-3)] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] text-transparent"
            }
          >
            ...
          </div>
          <div
            className={
              "animate-shimmer rounded-[var(--ns-border-radius-3)] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] text-transparent"
            }
          >
            ...
          </div>
          <div
            className={
              "animate-shimmer rounded-[var(--ns-border-radius-3)] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] text-transparent"
            }
          >
            ...
          </div>
        </div>
      </div>
    )
  }

  return (
    <SerpElement
      as={DynamicCard}
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        handle: product.handle!,
        template: "card",
        className:
          "relative box-border w-full max-w-full flex-[0_0_100%] p-[var(--ns-space-2)] text-inherit no-underline"
      }}
    />
  )
}
