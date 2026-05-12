import { HistoryElement } from "@nosto/search-js/preact/autocomplete"
import { useOnSubmit } from "../OnSubmitContext"

type HistoryItemProps = {
  item: string
}

export default function HistoryItem({ item }: HistoryItemProps) {
  const onSubmit = useOnSubmit()
  return (
    <HistoryElement
      key={item}
      class={
        "flex min-h-[1.5em] cursor-pointer items-center gap-[10px] rounded-[6px] px-2 py-1 text-inherit no-underline hover:bg-[var(--ns-color-focus)] focus:bg-[var(--ns-color-focus)]"
      }
      onSubmit={() => onSubmit(item)}
    >
      <div
        className={
          "overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-medium leading-[1.2] text-[#1f2937]"
        }
      >
        {item}
      </div>
    </HistoryElement>
  )
}
