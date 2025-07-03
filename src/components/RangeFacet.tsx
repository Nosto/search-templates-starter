import { useRange } from "@nosto/search-js/preact/hooks"
import { useState } from "preact/hooks"
import RangeInput from "./elements/RangeInput"
import Icon from "./elements/Icon"
import { SearchStatsFacet } from "@nosto/nosto-js/client"

export default function RangeFacet({ facet }: { facet: SearchStatsFacet }) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const isSelected = min !== range[0] || max !== range[1]
  const [active, setActive] = useState(isSelected)

  return (
    <li class={`ns-sidebar-dropdown ${active ? "ns-active" : ""}`}>
      <span
        class="ns-anchor ns-d-inline-block ns-relative ns-w-100 ns-border-box ns-p-4"
        onClick={() => {
          setActive(!active)
        }}
      >
        <span class="ns-color-black ns-font-4">{facet.name}</span>
        {isSelected && (
          <span class="ns-total-count ns-d-inline-block ns-text-align-center ns-font-3 ns-font-bold ns-color-white ns-background-primary ns-ml-1">
            {1}
          </span>
        )}
        <Icon name="arrow" className="ns-absolute" />
      </span>
      <div class="ns-sidebar-submenu ns-d-none ns-p-4">
        <div class="ns-d-flex ns-justify-content-between ns-font-4">
          <div class="ns-col-6 flex-shrink-1 ns-mr-2">
            <label for={`ns-${facet.id}-min`} class="ns-form-label">
              Min.
            </label>
            <RangeInput
              id={`ns-${facet.id}-min`}
              min={min}
              max={max}
              value={range[0]}
              onChange={e => {
                const value = parseFloat(e.currentTarget.value) || undefined
                updateRange([value, range[1]])
              }}
            />
          </div>
          <div class="ns-col-6 flex-shrink-1">
            <label for={`ns-${facet.id}-max`} class="ns-form-label">
              Max.
            </label>
            <RangeInput
              id={`ns-${facet.id}-max`}
              min={min}
              max={max}
              value={range[1]}
              onChange={e => {
                const value = parseFloat(e.currentTarget.value) || undefined
                updateRange([range[0], value])
              }}
            />
          </div>
        </div>
      </div>
    </li>
  )
}
