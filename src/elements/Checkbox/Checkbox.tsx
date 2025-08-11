import cl from "@/utils/cl"

type Props = {
  value: string
  selected: boolean
  onChange: (e: Event) => void
  className?: string
}

export default function Checkbox({ value, selected, onChange, className }: Props) {
  return (
    <label className={cl("block text-ns-black relative pl-ns-5 cursor-pointer select-none", className)}>
      {value}
      <input
        type="checkbox"
        checked={selected}
        onChange={onChange}
        className="absolute opacity-0 cursor-pointer h-0 w-0"
      />
      <span
        className={cl(
          "absolute top-0 left-0 h-ns-input-checkbox w-ns-input-checkbox bg-ns-grey-light rounded-ns-3",
          "after:content-[''] after:absolute after:hidden after:left-[5px] after:top-[1px]",
          "after:w-ns-input-checkbox-tick after:h-ns-input-checkbox-tick after:border-solid after:border-ns-white",
          "after:border-0 after:border-r-2 after:border-b-2 after:rotate-45",
          selected && "bg-ns-primary after:block"
        )}
      />
    </label>
  )
}
