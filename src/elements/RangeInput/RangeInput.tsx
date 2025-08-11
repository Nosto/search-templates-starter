import { JSX } from "preact"
import cl from "@/utils/cl"

type Props = JSX.IntrinsicElements["input"]

export default function RangeInput({ className, ...props }: Props) {
  return (
    <input
      type="number"
      className={cl(
        "box-border w-full p-ns-2 font-ns-regular leading-ns-tiny",
        "bg-ns-grey-light bg-clip-padding border-0 appearance-none rounded-ns-4",
        "transition-all duration-150 ease-in-out block",
        "focus:outline-0 focus:shadow-[inset_0_0_0_1px_var(--ns-color-primary-light),0_0_0_3px_var(--ns-color-grey)]",
        className
      )}
      {...props}
    />
  )
}
