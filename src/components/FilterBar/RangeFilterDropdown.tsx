import { useState, useRef, useEffect } from "preact/hooks"
import { useRange } from "@nosto/search-js/preact/hooks"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import FilterTrigger from "./FilterTrigger"
import RangeInput from "@/elements/RangeInput/RangeInput"
import Button from "@/elements/Button/Button"
import styles from "./RangeFilterDropdown.module.css"

type Props = {
  facet: SearchStatsFacet
}

export default function RangeFilterDropdown({ facet }: Props) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const [isOpen, setIsOpen] = useState(false)
  const [localMin, setLocalMin] = useState(range[0])
  const [localMax, setLocalMax] = useState(range[1])
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isFiltered = min !== range[0] || max !== range[1]

  // Update local values when range changes
  useEffect(() => {
    setLocalMin(range[0])
    setLocalMax(range[1])
  }, [range])

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

  const applyFilter = () => {
    updateRange([localMin, localMax])
    setIsOpen(false)
  }

  const resetFilter = () => {
    setLocalMin(min)
    setLocalMax(max)
    updateRange([min, max])
  }

  const formatDisplayValue = () => {
    if (!isFiltered) {
      return "Any"
    }

    if (localMin === min && localMax === max) {
      return "Any"
    }

    if (localMin === min) {
      return `Up to ${localMax}`
    }

    if (localMax === max) {
      return `${localMin}+`
    }

    return `${localMin} - ${localMax}`
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <FilterTrigger
        value={formatDisplayValue() || facet.name}
        isOpen={isOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        ariaLabel={`Filter by ${facet.name}`}
      />

      {isOpen && (
        <div className={styles.menu} role="menu">
          <div className={styles.header}>
            <span className={styles.label}>The highest price is ${max}</span>
            <button type="button" className={styles.button} onClick={resetFilter}>
              Reset
            </button>
          </div>
          <div className={styles.inputs}>
            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>$</span>
              <RangeInput
                value={localMin}
                min={min}
                max={max}
                placeholder="From"
                onChange={e => setLocalMin(Number(e.currentTarget.value))}
                className={styles.input}
                aria-label={`Minimum ${facet.name}`}
              />
            </div>
            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>$</span>
              <RangeInput
                value={localMax}
                min={min}
                max={max}
                placeholder="To"
                onChange={e => setLocalMax(Number(e.currentTarget.value))}
                className={styles.input}
                aria-label={`Maximum ${facet.name}`}
              />
            </div>
          </div>
          <div className={styles.actions}>
            <Button onClick={applyFilter}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  )
}
