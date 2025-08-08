import { JSX } from "preact/jsx-runtime"
import styles from "./Button.module.css"
import Icon from "@/elements/Icon/Icon"

type Props = {
  icon?: string
  light?: boolean
} & JSX.IntrinsicElements["button"]

export default function Button({ className, icon, children, light, ...props }: Props) {
  return (
    <button className={`${styles.button} ${light && styles.light} ${className}`} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
