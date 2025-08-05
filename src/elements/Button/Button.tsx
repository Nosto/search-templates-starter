import { JSX } from "preact/jsx-runtime"
import styles from "./button.module.css"
import Icon from "@/elements/Icon/Icon"

export default function Button({
  className,
  icon,
  children,
  light,
  ...props
}: { icon?: string; light?: boolean } & JSX.IntrinsicElements["button"]) {
  return (
    <button className={`${styles.button} ${light && styles.light} ${className}`} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
