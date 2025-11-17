import { useState, useEffect } from "preact/hooks"
import { useFacet } from "@nosto/search-js/preact/hooks"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
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
  const [pendingUpdates, setPendingUpdates] = useState<Array<{ value: string; selected: boolean }>>([])

  const [optimisticData, setOptimisticData] = useOptimistic<
    Array<{ value: string; count: number; selected?: boolean }>,
    Array<{ value: string; selected: boolean }>
  >(facet.data || [], (currentData, updates) => {
    // Apply all accumulated updates using reduce
    return updates.reduce((data, { value, selected }) => {
      return data.map(item => (item.value === value ? { ...item, selected } : item))
    }, currentData)
  })

  // Ensure selected is always a boolean
  const normalizedData = optimisticData.map(item => ({
    ...item,
    selected: item.selected ?? false
  }))

  // Clear pending updates when facet data changes (server update received)
  useEffect(() => {
    setPendingUpdates([])
  }, [facet.data])

  const selectedFiltersCount = normalizedData.filter(item => item.selected).length

  const toggleProductFilter = (field: string, value: string, selected: boolean) => {
    // Accumulate updates using useState
    const newUpdate = { value, selected }
    setPendingUpdates(prev => [...prev, newUpdate])
    setOptimisticData([...pendingUpdates, newUpdate])
    facetHook.toggleProductFilter(field, value, selected)
  }

  return {
    active: facetHook.active,
    toggleActive: facetHook.toggleActive,
    optimisticData: normalizedData,
    selectedFiltersCount,
    toggleProductFilter
  }
}
