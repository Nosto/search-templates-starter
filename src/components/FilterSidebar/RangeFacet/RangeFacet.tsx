import { useRange } from "@nosto/search-js/preact/hooks"
import DualRange from "@/elements/DualRange/DualRange"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import { cl } from "@nosto/search-js/utils"

type Props = {
  facet: SearchStatsFacet
}

export default function RangeFacet({ facet }: Props) {
  const { min, max, range, updateRange, active, toggleActive } = useRange(facet.id)
  const isSelected = min !== range[0] || max !== range[1]

  return (
    <li
      className={cl(
        "border-b border-ns-thin border-ns-grey-light md:last:border-b-0",
        active && "[&>.menu]:max-h-ns-facet [&>.menu]:p-ns-4 [&>.menu]:opacity-100"
      )}
    >
      <button
        className="cursor-pointer inline-block relative w-full box-border p-ns-4 bg-transparent border-none text-left [&>.icon]:right-ns-16 [&>.icon]:block [&>.icon]:absolute [&>.icon]:top-1/2 [&>.icon]:-translate-y-1/2"
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
        <span className="text-ns-black text-ns-4">{facet.name}</span>
        {isSelected && (
          <span className="whitespace-nowrap align-baseline leading-ns-tiny inline-block text-center text-ns-3 font-ns-bold rounded-ns-pill text-ns-white bg-ns-primary py-[0.1rem] px-[0.35rem] ml-ns-1">
            {1}
          </span>
        )}
        <span className="icon">
          <Icon name={active ? "arrow-up" : "arrow-down"} circle={true} />
        </span>
      </button>
      <div
        className="menu max-h-0 overflow-hidden p-0 px-ns-4 transition-[max-height_var(--ns-transition-duration)_var(--ns-transition-easing),opacity_var(--ns-transition-duration)_var(--ns-transition-easing),padding_var(--ns-transition-duration)_var(--ns-transition-easing)] opacity-0"
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
