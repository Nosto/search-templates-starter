import { useNostoAppState } from "@nosto/search-js/preact/hooks"

export default function NoResults() {
  const query = useNostoAppState(state => state.response.query)

  return (
    <div className={"my-[var(--ns-space-5)] text-[length:var(--ns-font-size-4)]"}>
      <div>No results found for &apos;{query}&apos;</div>
    </div>
  )
}
