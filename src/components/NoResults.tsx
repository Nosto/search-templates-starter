import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./NoResults.module.css"

export default function NoResults() {
  const query = useNostoAppState(state => state.response.query)

  return (
    <div className={style.container}>
      <div>No results found for '{query}'</div>
      <div class="nosto_element" id="noresults-nosto-1"></div>
    </div>
  )
}
