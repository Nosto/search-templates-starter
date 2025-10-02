import Icon from "@/elements/Icon/Icon"
import styles from "./FilterTrigger.module.css"

interface FilterTriggerProps {
  label: string
  value?: string
  isOpen: boolean
  onClick: () => void
  onKeyDown: (e: KeyboardEvent) => void
  ariaLabel: string
}

function FilterTrigger({ label, value, isOpen, onClick, onKeyDown, ariaLabel }: FilterTriggerProps) {
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
      <span className={styles.label}>{label}</span>
      {value && <span className={styles.value}>{value}</span>}
      <Icon name={isOpen ? "arrow-up" : "arrow-down"} />
    </button>
  )
}

export default FilterTrigger
