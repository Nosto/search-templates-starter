import { JSX } from "preact"
import { cl } from "@nosto/search-js/utils"

type Props = {
  options: { value: string | number; label: string }[]
  label?: string
} & JSX.IntrinsicElements["select"]

export default function Select({ value, onChange, className, options, label }: Props) {
  return (
    <div className={"relative"}>
      <select
        className={cl(
          "relative m-0 w-auto cursor-pointer appearance-none overflow-hidden text-ellipsis whitespace-nowrap rounded-[var(--ns-border-radius-pill)] border-0 bg-[var(--ns-color-grey-light)] px-[var(--ns-space-3)] py-[var(--ns-space-2)] text-left font-[inherit] text-[length:var(--ns-font-size-4)] font-[var(--ns-weight-regular)] text-[var(--ns-color-black)] transition-colors duration-200 ease-[ease] hover:bg-[var(--ns-color-grey)] focus:bg-[var(--ns-color-primary-light)] focus:outline-none",
          className
        )}
        value={value || "placeholder"}
        onChange={onChange}
        aria-label={label || "Select"}
      >
        <option value="placeholder" disabled>
          {label || "Select an option"}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
