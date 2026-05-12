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
    <div className={"mt-[var(--ns-space-4)] flex flex-wrap gap-[var(--ns-space-2)]"}>
      {product.skus?.map(sku => (
        <label
          key={sku.id}
          className={cl(
            "mb-[var(--ns-space-4)] inline-block cursor-pointer border-[var(--ns-color-grey)] bg-[var(--ns-color-grey-light)] p-[var(--ns-space-2)] [&_input]:hidden",
            skuId === sku.id && "border-[var(--ns-color-black)] bg-[var(--ns-color-black)] text-[var(--ns-color-white)]"
          )}
          onClick={() => onChange(sku.id!)}
        >
          {sku.name}
        </label>
      ))}
    </div>
  )
}
