import { HistoryElement } from "@nosto/search-js/preact/autocomplete"
import styles from "./HistoryItem.module.css"
import { cl } from "@nosto/search-js/utils"
import { UseRovingFocusResult } from "@/hooks/useRovingFocus"
import { useRef } from "preact/hooks"

type HistoryItemProps = {
  item: string
  onSubmit: (query: string) => void
  rovingFocus: UseRovingFocusResult
}

export function HistoryItem({ item, onSubmit, rovingFocus }: HistoryItemProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const highlighted = elementRef.current && elementRef.current === document.activeElement

  return (
    <HistoryElement key={item} onSubmit={() => onSubmit(item)}>
      <div
        ref={elementRef}
        className={cl(styles.container, highlighted && styles.highlighted)}
        tabIndex={elementRef.current ? rovingFocus.getTabIndex(elementRef.current) : -1}
        data-roving-focus-item
        role="button"
        onClick={() => onSubmit(item)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            onSubmit(item)
          } else {
            rovingFocus.handleKeyDown(e)
          }
        }}
      >
        <div className={styles.name}>{item}</div>
      </div>
    </HistoryElement>
  )
}
