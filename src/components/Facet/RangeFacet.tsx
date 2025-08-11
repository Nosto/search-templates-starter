import { useRange } from "@nosto/search-js/preact/hooks"
import { useState } from "preact/hooks"
import RangeInput from "@/elements/RangeInput/RangeInput"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet } from "@nosto/nosto-js/client"

type Props = {
  facet: SearchStatsFacet
}

export default function RangeFacet({ facet }: Props) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const isSelected = min !== range[0] || max !== range[1]
  const [active, setActive] = useState(isSelected)

  return (
    <li className={`border-b border-ns-grey-light md:last:border-b-0 ${active ? "active" : ""}`}>
      <span
        className="cursor-pointer inline-block relative w-full box-border p-ns-4"
        onClick={() => {
          setActive(!active)
        }}
      >
        <span className="text-ns-black text-ns-4">{facet.name}</span>
        {isSelected && (
          <span className="whitespace-nowrap align-baseline leading-ns-tiny inline-block text-center text-ns-3 font-ns-bold rounded-full text-ns-white bg-ns-primary px-[0.35rem] py-[0.1rem] ml-ns-1">
            {1}
          </span>
        )}
        <span className="right-4 block top-4 absolute">
          <Icon name={active ? "arrow-up" : "arrow-down"} />
        </span>
      </span>
      <div className={`${active ? "block" : "hidden"} p-ns-4`} aria-expanded={active}>
        <div className="flex justify-between text-ns-4">
          <div className="relative w-full flex-[0_0_50%] max-w-[50%] mr-ns-2 flex-shrink">
            <label for={`ns-${facet.id}-min`}>Min.</label>
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
          <div className="relative w-full flex-[0_0_50%] max-w-[50%] mr-ns-2 flex-shrink">
            <label for={`ns-${facet.id}-max`}>Max.</label>
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
