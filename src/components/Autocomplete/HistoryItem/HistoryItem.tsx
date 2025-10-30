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
      class="flex items-center gap-[10px] no-underline rounded-[6px] cursor-pointer min-h-[1.5em] p-[4px_8px] focus:bg-ns-focus hover:bg-ns-focus"
      onSubmit={() => onSubmit(item)}
    >
      <div className="text-[15px] font-medium text-[#1f2937] leading-[1.2] whitespace-nowrap overflow-hidden text-ellipsis">
        {item}
      </div>
    </HistoryElement>
  )
}
