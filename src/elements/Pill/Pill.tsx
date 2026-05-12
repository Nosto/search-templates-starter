import { cl } from "@nosto/search-js/utils"
import { ComponentChildren } from "preact"

type Props = {
  children: ComponentChildren
  secondary?: ComponentChildren
  selected?: boolean
  onClick?: (e: Event) => void
}

export default function Pill({ children, secondary, selected = false, onClick }: Props) {
  return (
    <button
      className={cl(
        "mr-[var(--ns-space-1)] my-[var(--ns-space-1)] inline-flex cursor-pointer items-center justify-center rounded-[var(--ns-border-radius-pill)] border-0 bg-[var(--ns-color-grey-light)] px-[var(--ns-space-3)] py-[var(--ns-space-2)] font-[inherit] text-[length:var(--ns-font-size-3)] text-[var(--ns-color-black)] transition-colors duration-200 ease-[ease] hover:bg-[var(--ns-color-black)] hover:text-[var(--ns-color-white)]",
        "group",
        selected && "bg-[var(--ns-color-black)] text-[var(--ns-color-white)]"
      )}
      onClick={onClick}
      type="button"
    >
      {children}
      {secondary && (
        <span
          className={cl(
            "ml-1 inline-block text-[length:var(--ns-font-size-2)] text-[var(--ns-color-grey-dark)] group-hover:text-[var(--ns-color-grey)]",
            selected && "text-[var(--ns-color-grey)]"
          )}
        >
          {secondary}
        </span>
      )}
    </button>
  )
}
