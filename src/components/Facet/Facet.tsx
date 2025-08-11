import { useFacet } from "@nosto/search-js/preact/hooks"
import Checkbox from "@/elements/Checkbox/Checkbox"
import Icon from "@/elements/Icon/Icon"
import { SearchTermsFacet } from "@nosto/nosto-js/client"

type Props = {
  facet: SearchTermsFacet
}

export default function Facet({ facet }: Props) {
  const { active, selectedFiltersCount, toggleActive, toggleProductFilter } = useFacet(facet)

  return (
    <li class={`border-b border-ns-grey-light md:last:border-b-0 ${active ? "active" : ""}`} aria-expanded={!!active}>
      <span
        className="cursor-pointer inline-block relative w-full box-border p-ns-4"
        data-nosto-element="facet"
        onClick={toggleActive}
        aria-controls={`${facet.id}-sub-menu`}
        aria-label={`${active ? "Collapse" : "Expand"} ${facet.name}`}
      >
        <span className="text-ns-black text-ns-4">{facet.name}</span>
        {selectedFiltersCount > 0 && (
          <span className="whitespace-nowrap align-baseline leading-ns-tiny inline-block text-center text-ns-3 font-ns-bold rounded-full text-ns-white bg-ns-primary px-[0.35rem] py-[0.1rem] ml-ns-1">
            {selectedFiltersCount}
          </span>
        )}
        <span className="right-4 block top-4 absolute">
          <Icon name={active ? "arrow-up" : "arrow-down"} />
        </span>
      </span>
      <div className={`${active ? "block" : "hidden"} p-ns-4`} id={`${facet.id}-sub-menu`}>
        <ul className="list-none p-0 m-0" role="menu">
          {facet.data?.map(value => (
            <li
              key={value.value}
              data-nosto-element="facet-setting"
              role="menuitem"
              className="flex justify-between items-center text-ns-3 not-first:my-ns-2"
            >
              <Checkbox
                value={value.value}
                selected={value.selected}
                onChange={e => {
                  e.preventDefault()
                  toggleProductFilter(facet.field, value.value, !value.selected)
                }}
              />
              <span className="whitespace-nowrap align-baseline leading-ns-tiny inline-block text-center text-ns-3 font-ns-bold p-ns-1 text-ns-black bg-ns-grey-light rounded-ns-3">
                {value.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
