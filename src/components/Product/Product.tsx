import { SerpElement } from "@nosto/search-js/preact/serp"
import { productImagePlaceholder } from "@/helpers"
import { SearchProduct } from "@nosto/nosto-js/client"

type Props = {
  product: SearchProduct
  previewImage?: string
  children?: preact.JSX.Element | preact.JSX.Element[]
}

export default function Product({ product, previewImage, children }: Props) {
  return (
    <SerpElement
      as="a"
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        "aria-label": `Product ${product.name}`,
        className:
          "p-ns-2 text-inherit my-ns-2 box-border flex-[0_0_100%] max-w-full relative w-full no-underline min-[375px]:flex-[0_0_50%] min-[375px]:max-w-[50%] min-[1024px]:flex-[0_0_33.333333%] min-[1024px]:max-w-[33.333333%]",
        href: product.url
      }}
    >
      <div className="h-auto w-full">
        <img
          src={previewImage ?? product.imageUrl ?? productImagePlaceholder}
          alt={product.name}
          className="h-auto w-full"
        />
      </div>
      <div className="relative mt-ns-2" data-nosto-element="product">
        {product.brand && <div className="text-ns-black text-ns-4 mb-ns-1">{product.brand}</div>}
        <div className="text-ns-black text-ns-4 mb-ns-1">{product.name}</div>
        <div aria-label="Price" className="text-ns-black text-ns-4 mb-ns-1">
          <span>{product.priceText}</span>
          {product.listPrice && product.price && product.listPrice > product.price && (
            <span className="line-through ml-ns-2">{product.listPrice}</span>
          )}
        </div>
      </div>
      {children}
    </SerpElement>
  )
}
