import { cl } from "@nosto/search-js/utils"

type Props = {
  value: string
  selected: boolean
  onChange: (e: Event) => void
  className?: string
}

export default function Checkbox({ value, selected, onChange, className }: Props) {
  return (
    <label
      className={cl(
        "relative block cursor-pointer select-none pl-[var(--ns-space-5)] text-[var(--ns-color-black)] [&>input]:absolute [&>input]:h-0 [&>input]:w-0 [&>input]:cursor-pointer [&>input]:opacity-0",
        className
      )}
    >
      {value}
      <input type="checkbox" checked={selected} onChange={onChange} />
      <span
        className={
          "absolute left-0 top-0 h-[var(--ns-height-input-checkbox)] w-[var(--ns-height-input-checkbox)] rounded-[var(--ns-border-radius-3)] bg-[var(--ns-color-grey-light)] [input:checked~&]:bg-[var(--ns-color-primary)] after:absolute after:left-[var(--ns-space-05)] after:top-[var(--ns-border-width-thin)] after:hidden after:h-[var(--ns-height-input-checkbox-tick)] after:w-[var(--ns-width-input-checkbox-tick)] after:rotate-45 after:border-solid after:border-[var(--ns-color-white)] after:[border-width:0_var(--ns-border-width-medium)_var(--ns-border-width-medium)_0] after:content-[''] [input:checked~&]:after:block"
        }
      />
    </label>
  )
}
