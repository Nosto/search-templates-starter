import { JSX } from "preact/jsx-runtime"
import styles from "../../styles/elements/button.module.css"
import Icon from "./Icon"

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
