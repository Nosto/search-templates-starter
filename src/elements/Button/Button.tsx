import { JSX } from "preact/jsx-runtime"
import styles from "./Button.module.css"
import Icon from "@/elements/Icon/Icon"

interface ButtonProps {
  icon?: string
  light?: boolean
}

export default function Button({
  className,
  icon,
  children,
  light,
  ...props
}: ButtonProps & JSX.IntrinsicElements["button"]) {
  return (
    <button className={`${styles.button} ${light && styles.light} ${className}`} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
