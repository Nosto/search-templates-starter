import { useNostoAppState } from "@nosto/search-js/preact/hooks"

export default function NoResults() {
  const query = useNostoAppState(state => state.response.query)

  return (
    <div className="my-ns-5 text-ns-4">
      <div>No results found for '{query}'</div>
    </div>
  )
}
