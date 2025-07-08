import { useFacet } from "@nosto/search-js/preact/hooks"
import Checkbox from "./elements/Checkbox"
import Icon from "./elements/Icon"
import { SearchTermsFacet } from "@nosto/nosto-js/client"

export default function Facet({ facet }: { facet: SearchTermsFacet }) {
  const { active, selectedFiltersCount, toggleActive, toggleProductFilter } = useFacet(facet)

  return (
    <li class={`ns-sidebar-dropdown ${active ? "ns-active" : ""}`} aria-expanded={!!active}>
      <span
        class="ns-anchor ns-d-inline-block ns-relative ns-w-100 ns-border-box ns-p-4"
        data-nosto-element="facet"
        onClick={toggleActive}
        aria-controls={`${facet.id}-sub-menu`}
        aria-label={`${active ? "Collapse" : "Expand"} ${facet.name}`}
      >
        <span class="ns-color-black ns-font-4">{facet.name}</span>
        {selectedFiltersCount > 0 && (
          <span class="ns-total-count ns-d-inline-block ns-text-align-center ns-font-3 ns-font-bold ns-color-white ns-background-primary ns-ml-1">
            {selectedFiltersCount}
          </span>
        )}
        <Icon name="arrow" className="ns-absolute" />
      </span>
      <div class="ns-sidebar-submenu ns-d-none ns-p-4" id={`${facet.id}-sub-menu`}>
        <ul class="ns-list-unstyled ns-p-0 ns-m-0" role="menu">
          {facet.data?.map(value => (
            <li
              key={value.value}
              class="ns-d-flex ns-justify-content-between ns-align-items-center ns-font-3"
              data-nosto-element="facet-setting"
              role="menuitem"
            >
              <Checkbox
                value={value.value}
                selected={value.selected}
                onChange={e => {
                  e.preventDefault()
                  toggleProductFilter(facet.field, value.value, !value.selected)
                }}
              />
              <span class="ns-count ns-d-inline-block ns-text-align-center ns-py-1 ns-px-1 ns-font-3 ns-font-bold ns-color-black ns-background-grey-light ns-border-radius-3">
                {value.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
