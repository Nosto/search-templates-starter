import { JSX } from "preact/jsx-runtime"
import styles from "./Button.module.css"
import Icon, { IconName } from "@/elements/Icon/Icon"
import cl from "@/utils/cl"

type Props = {
  icon?: IconName
  light?: boolean
} & JSX.IntrinsicElements["button"]

export default function Button({ className, icon, children, light, ...props }: Props) {
  return (
    <button className={cl(styles.button, light && styles.light, className)} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
