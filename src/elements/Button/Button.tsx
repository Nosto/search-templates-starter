import { JSX } from "preact/jsx-runtime"
import Icon, { IconName } from "@/elements/Icon/Icon"
import { cl } from "@nosto/search-js/utils"

type Props = {
  icon?: IconName
  light?: boolean
} & JSX.IntrinsicElements["button"]

export default function Button({ className, icon, children, light, type = "button", ...props }: Props) {
  return (
    <button
      className={cl(
        "cursor-pointer select-none rounded-[var(--ns-border-radius-4)] border border-transparent bg-transparent px-[var(--ns-space-2)] py-[var(--ns-space-2)] align-middle font-[inherit] text-[length:var(--ns-font-size-4)] font-[var(--ns-weight-regular)] leading-[var(--ns-line-height-tiny)] text-[var(--ns-color-black)] no-underline transition-[color,background-color,border-color,box-shadow] duration-150 ease-in-out active:shadow-[var(--ns-box-shadow-button)] active:transition-none [&>*:not(:first-child)]:ml-[var(--ns-space-1)]",
        light &&
          "rounded-[var(--ns-border-radius-pill)] border-0 bg-[var(--ns-color-grey-light)] text-[var(--ns-color-black)] hover:bg-[var(--ns-color-grey)]",
        className
      )}
      type={type}
      {...props}
    >
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
