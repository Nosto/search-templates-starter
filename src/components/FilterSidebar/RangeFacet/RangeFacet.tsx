import { useState } from "preact/hooks"
import { useRange } from "@nosto/search-js/preact/hooks"
import DualRange from "@/elements/DualRange/DualRange"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import { cl } from "@nosto/search-js/utils"

type Props = {
  facet: SearchStatsFacet
  /** Whether the facet is initially expanded (default: false) */
  defaultActive?: boolean
}

export default function RangeFacet({ facet, defaultActive = false }: Props) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const [active, setActive] = useState(defaultActive)
  const isSelected = min !== range[0] || max !== range[1]

  const toggleActive = () => {
    setActive(!active)
  }

  return (
    <li
      className={cl(
        "border-b border-[var(--ns-color-grey-light)] md:last:border-b-0",
        active &&
          "[&>.ns-facet-menu]:max-h-[var(--ns-facet-max-height)] [&>.ns-facet-menu]:p-[var(--ns-space-4)] [&>.ns-facet-menu]:opacity-100"
      )}
    >
      <button
        className={
          "relative inline-block w-full box-border cursor-pointer border-0 bg-transparent p-[var(--ns-space-4)] text-left"
        }
        onClick={() => {
          toggleActive()
        }}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleActive()
          }
        }}
        aria-controls={`${facet.id}-range-menu`}
        aria-expanded={active}
        aria-label={`${active ? "Collapse" : "Expand"} ${facet.name} range filter`}
        type="button"
      >
        <span className={"text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]"}>{facet.name}</span>
        {isSelected && (
          <span
            className={
              "ml-[var(--ns-space-1)] inline-block whitespace-nowrap rounded-[var(--ns-border-radius-pill)] bg-[var(--ns-color-primary)] px-[0.35rem] py-[0.1rem] align-baseline text-center text-[length:var(--ns-font-size-3)] font-[var(--ns-weight-bold)] leading-[var(--ns-line-height-tiny)] text-[var(--ns-color-white)]"
            }
          >
            {1}
          </span>
        )}
        <span className={"absolute right-[var(--ns-space-16)] top-1/2 block -translate-y-1/2"}>
          <Icon name={active ? "arrow-up" : "arrow-down"} circle={true} />
        </span>
      </button>
      <div
        className={
          "ns-facet-menu max-h-0 overflow-hidden px-[var(--ns-space-4)] py-0 opacity-0 transition-[max-height,opacity,padding] duration-[var(--ns-transition-duration)] ease-[var(--ns-transition-easing)]"
        }
        id={`${facet.id}-range-menu`}
        aria-expanded={active}
      >
        <DualRange
          min={min}
          max={max}
          value={[range[0], range[1]]}
          onChange={updateRange}
          id={`ns-${facet.id}-range`}
        />
      </div>
    </li>
  )
}
