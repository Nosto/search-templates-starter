import { SerpElement } from "@nosto/search-js/preact/serp"
import { productImagePlaceholder } from "../helpers"
import { SearchProduct } from "@nosto/nosto-js/client"

export default function Product({
  product,
  previewImage,
  children
}: {
  product: SearchProduct
  previewImage?: string
  children?: preact.JSX.Element | preact.JSX.Element[]
}) {
  return (
    <SerpElement as="a" hit={{ productId: product.productId!, url: product.url }}>
      <div className="ns-overflow-hidden">
        <img
          class="ns-w-100 ns-h-auto"
          src={previewImage ?? product.imageUrl ?? productImagePlaceholder}
          alt={product.name}
        />
      </div>
      <div class="ns-relative ns-mt-2" data-nosto-element="product">
        {product.brand && <div class="ns-color-black ns-mb-1 ns-font-4">{product.brand}</div>}
        <div class="ns-clipped ns-text-four-lines ns-text-md-three-lines ns-mb-2 ns-font-4">{product.name}</div>
        <div aria-label="Price">
          <span>{product.priceText}</span>
          {product.listPrice && product.price && product.listPrice > product.price && (
            <span class="ns-color-black ns-font-4 ns-text-striked ns-ml-2">{product.listPrice}</span>
          )}
        </div>
      </div>
      {children}
    </SerpElement>
  )
}
