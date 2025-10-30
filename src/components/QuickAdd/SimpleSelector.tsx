/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Product } from "@/types"
import { cl } from "@nosto/search-js/utils"

type Props = {
  product: Product
  skuId: string | undefined
  onChange: (skuId: string) => void
}

export default function SimpleSelector({ product, skuId, onChange }: Props) {
  return (
    <div className="mt-ns-4 flex flex-wrap gap-ns-2">
      {product.skus?.map(sku => (
        <label
          key={sku.id}
          className={cl("inline-block mb-ns-4 bg-ns-grey-light border-ns-grey p-ns-2 cursor-pointer", skuId === sku.id && "text-ns-white bg-ns-black border-ns-black")}
          onClick={() => onChange(sku.id!)}
        >
          {sku.name}
        </label>
      ))}
    </div>
  )
}
