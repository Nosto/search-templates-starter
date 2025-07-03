import { useNostoAppState } from "@nosto/search-js/preact/hooks"

export default function NoResults() {
  const query = useNostoAppState(state => state.response.query)

  return (
    <div class="ns-text-align-center ns-my-5 ns-mx-0">
      <div class="ns-font-4">No results found for '{query}'</div>
      <div class="nosto-rec-container">
        <div class="nosto_element" id="noresults-nosto-1"></div>
      </div>
    </div>
  )
}
