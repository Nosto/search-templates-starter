import { HistoryElement as BaseHistoryElement } from "@nosto/search-js/preact/autocomplete"
import { AutocompleteContext } from "@nosto/search-js/preact/inject"
import { useContext } from "preact/hooks"
import styles from "./HistoryElement.module.css"
import { useActions } from "@nosto/search-js/preact/hooks";

export default function HistoryElement({ item, highlighted }: { item: string; highlighted: boolean }) {
//   const { handleSubmit } = useContext(AutocompleteContext)
  const { newSearch } = useActions()

  const onSubmit = () => {
    // handleSubmit({ query: item })
    newSearch({
        query: item
    })
  }

  return (
    <BaseHistoryElement key={item} onSubmit={onSubmit}>
      <div className={`${styles.container} ${highlighted && styles.highlighted}`}>
        <div className={styles.name}>{item}</div>
      </div>
    </BaseHistoryElement>
  )
}
