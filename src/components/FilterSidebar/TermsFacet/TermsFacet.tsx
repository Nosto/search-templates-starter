import Icon from "@/elements/Icon/Icon"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import Pill from "@/elements/Pill/Pill"
import { useOptimisticFacet } from "@/hooks/useOptimisticFacet"

type Props = {
  facet: SearchTermsFacet
}

export default function TermsFacet({ facet }: Props) {
  const { active, toggleActive, optimisticData, selectedFiltersCount, toggleProductFilter } = useOptimisticFacet(facet)

  return (
    <li
      className={`${"border-b border-[var(--ns-color-grey-light)] md:last:border-b-0"} ${active ? "[&>.ns-facet-menu]:max-h-[var(--ns-facet-max-height)] [&>.ns-facet-menu]:opacity-100" : ""}`}
    >
      <button
        className={
          "relative inline-block w-full box-border cursor-pointer border-0 bg-transparent p-[var(--ns-space-4)] text-left font-[inherit]"
        }
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
        <span className={"text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]"}>{facet.name}</span>
        {selectedFiltersCount > 0 && (
          <span
            className={`${"inline-block whitespace-nowrap align-baseline text-center text-[length:var(--ns-font-size-3)] font-[var(--ns-weight-bold)] leading-[var(--ns-line-height-tiny)]"} ${"ml-[var(--ns-space-1)] rounded-[var(--ns-border-radius-pill)] bg-[var(--ns-color-primary)] px-[0.35rem] py-[0.1rem] text-[var(--ns-color-white)]"}`}
          >
            {selectedFiltersCount}
          </span>
        )}
        <span className={"absolute right-[var(--ns-space-16)] top-1/2 block -translate-y-1/2"}>
          <Icon name={active ? "arrow-up" : "arrow-down"} circle={true} />
        </span>
      </button>
      <div
        className={
          "ns-facet-menu max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-[var(--ns-transition-duration)] ease-[var(--ns-transition-easing)]"
        }
        id={`${facet.id}-sub-menu`}
      >
        <div className={"p-[var(--ns-space-2)]"} role="menu">
          {optimisticData.map(value => (
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
