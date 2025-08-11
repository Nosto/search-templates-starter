import { JSX } from "preact/jsx-runtime"
import Icon, { IconName } from "@/elements/Icon/Icon"
import cl from "@/utils/cl"

type Props = {
  icon?: IconName
  light?: boolean
} & JSX.IntrinsicElements["button"]

export default function Button({ className, icon, children, light, ...props }: Props) {
  return (
    <button
      className={cl(
        // Base button styles
        "font-inherit font-ns-regular leading-ns-tiny text-ns-black no-underline",
        "align-middle cursor-pointer select-none bg-transparent border border-transparent",
        "px-ns-2 py-ns-2 text-ns-4 rounded-ns-4",
        "transition-all duration-150 ease-in-out",
        "hover:shadow-ns-button hover:transition-none",
        "active:shadow-ns-button active:transition-none",
        // Light variant styles
        light && "text-ns-black bg-ns-white border-ns-grey-light",
        // Additional classes
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-ns-1">
        {icon && <Icon name={icon} />}
        {children}
      </div>
    </button>
  )
}
