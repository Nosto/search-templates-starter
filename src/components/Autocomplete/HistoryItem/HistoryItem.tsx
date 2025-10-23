import { HistoryElement } from "@nosto/search-js/preact/autocomplete"
import styles from "./HistoryItem.module.css"
import { cl } from "@nosto/search-js/utils"
import { UseRovingFocusResult } from "@/hooks/useRovingFocus"
import { useEffect } from "preact/hooks"

type HistoryItemProps = {
  item: string
  highlighted: boolean
  onSubmit: (query: string) => void
  rovingFocus: UseRovingFocusResult
  itemIndex: number
}

export function HistoryItem({ item, highlighted, onSubmit, rovingFocus, itemIndex }: HistoryItemProps) {
  const focusProps = rovingFocus.getFocusProps(`history-${item}`, itemIndex)

  // Set the onSelect callback when the component mounts/updates
  useEffect(() => {
    rovingFocus.registerItem({
      id: `history-${item}`,
      element: null as unknown as HTMLElement, // Will be set by ref
      onSelect: () => onSubmit(item)
    })
  }, [item, onSubmit, rovingFocus])

  return (
    <HistoryElement key={item} onSubmit={() => onSubmit(item)}>
      <div className={cl(styles.container, highlighted && styles.highlighted)} {...focusProps}>
        <div className={styles.name}>{item}</div>
      </div>
    </HistoryElement>
  )
}
