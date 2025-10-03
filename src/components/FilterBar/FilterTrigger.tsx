import Icon from "@/elements/Icon/Icon"
import styles from "./FilterTrigger.module.css"

interface FilterTriggerProps {
  value?: string
  isOpen: boolean
  onClick: () => void
  onKeyDown: (e: KeyboardEvent) => void
  ariaLabel: string
}

function FilterTrigger({ value, isOpen, onClick, onKeyDown, ariaLabel }: FilterTriggerProps) {
  return (
    <button
      className={styles.trigger}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label={ariaLabel}
      type="button"
    >
      {value && <span>{value}</span>}
      <Icon name={isOpen ? "arrow-up" : "arrow-down"} />
    </button>
  )
}

export default FilterTrigger
