import { useFacet } from "@nosto/search-js/preact/hooks"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import { useOptimistic } from "./useOptimistic"

/**
 * A hook that combines useFacet with useOptimistic to provide immediate UI feedback
 * when toggling filters. This hook provides the same API as useFacet but with
 * optimistic updates built-in.
 *
 * @param facet The search terms facet to manage
 * @returns An object with the same structure as useFacet, but with optimistic data and toggle function
 *
 * @example
 * ```tsx
 * function TermsFacet({ facet }: Props) {
 *   const { active, toggleActive, optimisticData, selectedFiltersCount, toggleProductFilter } = useOptimisticFacet(facet)
 *
 *   return (
 *     <div>
 *       {optimisticData.map(value => (
 *         <Checkbox
 *           selected={value.selected}
 *           onChange={() => toggleProductFilter(facet.field, value.value, !value.selected)}
 *         />
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export function useOptimisticFacet(facet: SearchTermsFacet) {
  const facetHook = useFacet(facet)

  const [optimisticData, setOptimisticData] = useOptimistic(facet.data || [], (currentData, update) => {
    const typedUpdate = update as { value: string; selected: boolean }
    return currentData.map(item =>
      item.value === typedUpdate.value ? { ...item, selected: typedUpdate.selected } : item
    )
  })

  const selectedFiltersCount = optimisticData.filter(item => item.selected).length

  const toggleProductFilter = (field: string, value: string, selected: boolean) => {
    setOptimisticData({ value, selected })
    facetHook.toggleProductFilter(field, value, selected)
  }

  return {
    ...facetHook,
    optimisticData,
    selectedFiltersCount,
    toggleProductFilter
  }
}
