import { JSX } from "preact/jsx-runtime"
import styles from "./button.module.css"
import { Icon } from "@/elements"

export default function Button({
  className,
  name,
  icon,
  children,
  ...props
}: { icon?: string } & JSX.IntrinsicElements["button"]) {
  const style = name ? styles[`button-${name}`] : ""

  return (
    <button type="submit" className={`${style} ${className}`} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
