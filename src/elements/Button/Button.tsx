import { JSX } from "preact/jsx-runtime"
import { styles } from "./styles"
import Icon, { IconName } from "@/elements/Icon/Icon"
import { cl } from "@nosto/search-js/utils"

type Props = {
  icon?: IconName
  light?: boolean
} & JSX.IntrinsicElements["button"]

export default function Button({ className, icon, children, light, type = "button", ...props }: Props) {
  return (
    <button className={cl(styles.button, light && styles.light, className)} type={type} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
