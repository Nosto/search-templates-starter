import { useState } from "preact/hooks"
import Icon from "@/elements/Icon/Icon"
import RadioButton from "@/elements/RadioButton/RadioButton"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import { useRangeSelector } from "@nosto/search-js/preact/hooks"
import { cl } from "@nosto/search-js/utils"

type Props = {
  /** The stats facet to display range options for */
  facet: SearchStatsFacet
  /** Size of auto-generated buckets (default: 100) */
  rangeSize?: number
  /** Whether the selector is initially expanded (default: false) */
  defaultActive?: boolean
}

export default function RangeSelector({ facet, rangeSize = 100, defaultActive = false }: Props) {
  const { ranges, updateRange } = useRangeSelector(facet.id, rangeSize)
  const [active, setActive] = useState(defaultActive)

  const toggleActive = () => {
    setActive(!active)
  }

  const selectedCount = ranges.filter(r => r.selected).length

  // TODO currency formatting for price ranges

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
        onClick={toggleActive}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleActive()
          }
        }}
        aria-controls={`${facet.id}-range-menu`}
        aria-expanded={active}
        aria-label={`${active ? "Collapse" : "Expand"} ${facet.name} range selector`}
        type="button"
      >
        <span className={"text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]"}>{facet.name}</span>
        {selectedCount > 0 && (
          <span
            className={
              "ml-[var(--ns-space-1)] inline-block whitespace-nowrap rounded-[var(--ns-border-radius-pill)] bg-[var(--ns-color-primary)] px-[0.35rem] py-[0.1rem] align-baseline text-center text-[length:var(--ns-font-size-3)] font-[var(--ns-weight-bold)] leading-[var(--ns-line-height-tiny)] text-[var(--ns-color-white)]"
            }
          >
            {selectedCount}
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
        <div className={"flex flex-col gap-[var(--ns-space-2)] pr-[var(--ns-space-2)]"}>
          {ranges.map(rangeItem => (
            <RadioButton
              key={`${rangeItem.min}-${rangeItem.max}`}
              name={`${facet.id}-range`}
              value={`${rangeItem.min} - ${rangeItem.max}`}
              selected={rangeItem.selected ?? false}
              onChange={() =>
                rangeItem.selected ? updateRange([undefined, undefined]) : updateRange([rangeItem.min, rangeItem.max])
              }
              className={"py-[var(--ns-space-2)]"}
            />
          ))}
        </div>
      </div>
    </li>
  )
}
