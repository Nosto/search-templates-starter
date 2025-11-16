import { useState, useRef, useEffect } from "preact/hooks"
import { useFacet } from "@nosto/search-js/preact/hooks"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import FilterTrigger from "../FilterTrigger/FilterTrigger"
import Checkbox from "@/elements/Checkbox/Checkbox"
import { useOptimistic } from "@/hooks/useOptimistic"
import styles from "./TermsDropdown.module.css"

type Props = {
  facet: SearchTermsFacet
}

export default function TermsDropdown({ facet }: Props) {
  const { toggleProductFilter } = useFacet(facet)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [optimisticData, setOptimisticData] = useOptimistic(facet.data || [], (currentData, update) => {
    const typedUpdate = update as { value: string; selected: boolean }
    return currentData.map(item =>
      item.value === typedUpdate.value ? { ...item, selected: typedUpdate.selected } : item
    )
  })

  // Count selected terms using optimistic data
  const selectedCount = optimisticData.filter(value => value.selected).length

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleDropdown()
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <FilterTrigger
        value={selectedCount > 0 ? `${facet.name} (${selectedCount})` : facet.name}
        isOpen={isOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        ariaLabel={`Filter by ${facet.name}`}
      />

      {isOpen && (
        <div className={styles.menu} role="menu">
          <div className={styles.options}>
            {optimisticData.map(value => (
              <div key={value.value} className={styles.option} role="menuitem">
                <Checkbox
                  value={`${value.value} (${value.count})`}
                  selected={value.selected}
                  onChange={e => {
                    e.preventDefault()
                    setOptimisticData({ value: value.value, selected: !value.selected })
                    toggleProductFilter(facet.field, value.value, !value.selected)
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
