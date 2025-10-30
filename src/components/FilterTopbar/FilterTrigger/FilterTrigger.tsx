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
      className="flex items-center gap-ns-2 p-ns-2 px-ns-3 bg-ns-white border-none rounded-ns-3 cursor-pointer text-ns-4 justify-between focus-visible:outline-2 focus-visible:outline-ns-primary focus-visible:outline-offset-2"
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
