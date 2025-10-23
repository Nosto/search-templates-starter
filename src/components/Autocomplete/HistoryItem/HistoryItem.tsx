import { HistoryElement } from "@nosto/search-js/preact/autocomplete"
import styles from "./HistoryItem.module.css"
import { cl } from "@nosto/search-js/utils"
import { useState, useEffect } from "preact/hooks"

type HistoryItemProps = {
  item: string
  onSubmit: (query: string) => void
}

export function HistoryItem({ item, onSubmit }: HistoryItemProps) {
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const handleFocusChange = () => {
      setFocused(document.activeElement?.getAttribute("data-roving-focus-item") === "true")
    }

    document.addEventListener("focusin", handleFocusChange)
    document.addEventListener("focusout", handleFocusChange)

    return () => {
      document.removeEventListener("focusin", handleFocusChange)
      document.removeEventListener("focusout", handleFocusChange)
    }
  }, [])

  return (
    <HistoryElement key={item} onSubmit={() => onSubmit(item)}>
      <div
        className={cl(styles.container, focused && styles.highlighted)}
        data-roving-focus-item="true"
        role="button"
        tabIndex={0}
        onClick={() => onSubmit(item)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            onSubmit(item)
          }
        }}
      >
        <div className={styles.name}>{item}</div>
      </div>
    </HistoryElement>
  )
}
