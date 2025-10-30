import { useFacet } from "@nosto/search-js/preact/hooks"
import Icon from "@/elements/Icon/Icon"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import Pill from "@/elements/Pill/Pill"

type Props = {
  facet: SearchTermsFacet
}

export default function TermsFacet({ facet }: Props) {
  const { active, selectedFiltersCount, toggleActive, toggleProductFilter } = useFacet(facet)

  return (
    <li
      className={`border-b border-ns-thin border-ns-grey-light md:last:border-b-0 ${active ? "[&>.menu]:max-h-ns-facet [&>.menu]:opacity-100" : ""}`}
    >
      <button
        className="font-[inherit] cursor-pointer inline-block relative w-full box-border p-ns-4 bg-transparent border-none text-left [&>.icon]:right-ns-16 [&>.icon]:block [&>.icon]:absolute [&>.icon]:top-1/2 [&>.icon]:-translate-y-1/2"
        data-nosto-element="facet"
        onClick={toggleActive}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleActive()
          }
        }}
        aria-controls={`${facet.id}-sub-menu`}
        aria-expanded={!!active}
        aria-label={`${active ? "Collapse" : "Expand"} ${facet.name}`}
        type="button"
      >
        <span className="text-ns-black text-ns-4">{facet.name}</span>
        {selectedFiltersCount > 0 && (
          <span className="whitespace-nowrap align-baseline leading-ns-tiny inline-block text-center text-ns-3 font-ns-bold rounded-ns-pill text-ns-white bg-ns-primary py-[0.1rem] px-[0.35rem] ml-ns-1">
            {selectedFiltersCount}
          </span>
        )}
        <span className="icon">
          <Icon name={active ? "arrow-up" : "arrow-down"} circle={true} />
        </span>
      </button>
      <div
        className="menu max-h-0 overflow-hidden transition-[max-height_var(--ns-transition-duration)_var(--ns-transition-easing),opacity_var(--ns-transition-duration)_var(--ns-transition-easing)] opacity-0"
        id={`${facet.id}-sub-menu`}
      >
        <div className="p-ns-2" role="menu">
          {facet.data?.map(value => (
            <Pill
              key={value.value}
              selected={value.selected}
              secondary={`(${value.count})`}
              onClick={e => {
                e.preventDefault()
                toggleProductFilter(facet.field, value.value, !value.selected)
              }}
            >
              {value.value}
            </Pill>
          ))}
        </div>
      </div>
    </li>
  )
}
