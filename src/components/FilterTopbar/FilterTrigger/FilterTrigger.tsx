import Icon from "@/elements/Icon/Icon"

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
      className={
        "flex cursor-pointer items-center justify-between gap-[var(--ns-space-2)] rounded-[var(--ns-border-radius-3)] border-0 bg-[var(--ns-color-white)] px-[var(--ns-space-3)] py-[var(--ns-space-2)] text-[length:var(--ns-font-size-4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ns-color-primary,#1976d2)]"
      }
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
