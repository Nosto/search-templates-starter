import { useState, useEffect } from "preact/hooks"
import { useFacet } from "@nosto/search-js/preact/hooks"
import { SearchFacetTerm, SearchTermsFacet } from "@nosto/nosto-js/client"
import { useOptimistic } from "./useOptimistic"

/**
 * A hook that combines useFacet with useOptimistic to provide immediate UI feedback
 * when toggling filters. This hook extends the same API as useFacet but with
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

  const [optimisticData, setOptimisticData] = useOptimistic<SearchFacetTerm[], Record<string, boolean>>(
    facet.data || [],
    (data, updates) => {
      return data.map(item => (updates[item.value] ? { ...item, selected: updates[item.value] } : item))
    }
  )

  const selectedFiltersCount = optimisticData.filter(item => item.selected).length

  function toggleProductFilter(field: string, value: string, selected: boolean) {
    setOptimisticData(prev => {
      return typeof prev === "symbol" ? { [value]: selected } : { ...prev, [value]: selected }
    })
    facetHook.toggleProductFilter(field, value, selected)
  }

  return {
    active: facetHook.active,
    toggleActive: facetHook.toggleActive,
    optimisticData,
    selectedFiltersCount,
    toggleProductFilter
  }
}
