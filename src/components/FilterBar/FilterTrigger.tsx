import Icon from "@/elements/Icon/Icon"
import styles from "./FilterTrigger.module.css"

interface FilterTriggerProps {
  label: string
  value?: string
  badge?: number
  isOpen: boolean
  onClick: () => void
  onKeyDown: (e: any) => void
  ariaLabel: string
}

function FilterTrigger({ label, value, badge, isOpen, onClick, onKeyDown, ariaLabel }: FilterTriggerProps) {
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
      {badge !== undefined && badge > 0 && <span className={styles.badge}>{badge}</span>}
      <Icon name={isOpen ? "arrow-up" : "arrow-down"} />
    </button>
  )
}

export default FilterTrigger
