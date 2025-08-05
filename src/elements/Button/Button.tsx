import { JSX } from "preact/jsx-runtime"
import styles from "./Button.module.css"
import Icon from "@/elements/Icon/Icon"

export default function Button({
  className,
  name,
  icon,
  children,
  ...props
}: { icon?: string } & JSX.IntrinsicElements["button"]) {
  const style = name ? styles[`button-${name}`] : ""

  return (
    <button className={`${style} ${className}`} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
