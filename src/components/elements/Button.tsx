import { JSX } from "preact/jsx-runtime"
import styles from "./Button.module.css"
import Icon from "./Icon"

export default function Button({
  className,
  name,
  icon,
  children,
  ...props
}: { icon?: string; name?: string } & JSX.IntrinsicElements["button"]) {
  const style = name ? (styles as any)[name] || styles.base : styles.base

  return (
    <button type="submit" className={`${style} ${className}`} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
