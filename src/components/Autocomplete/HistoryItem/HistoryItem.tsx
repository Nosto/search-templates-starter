import { HistoryElement } from "@nosto/search-js/preact/autocomplete"
import styles from "./HistoryItem.module.css"
import { useAutocompleteContext } from "../AutocompleteContext"

type HistoryItemProps = {
  item: string
}

export default function HistoryItem({ item }: HistoryItemProps) {
  const { onSubmit } = useAutocompleteContext()
  return (
    <HistoryElement key={item} class={styles.container} onSubmit={() => onSubmit(item)}>
      <div className={styles.name}>{item}</div>
    </HistoryElement>
  )
}
