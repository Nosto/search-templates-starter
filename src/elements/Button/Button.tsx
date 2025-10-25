import { JSX } from "preact/jsx-runtime"
import styles from "./Button.module.css"
import Icon, { IconName } from "@/elements/Icon/Icon"
import { cl } from "@nosto/search-js/utils"

type Props = {
  icon?: IconName
  light?: boolean
} & JSX.IntrinsicElements["button"]

/**
 * A customizable button component that can display an optional icon alongside text content.
 * Supports all standard HTML button attributes and behaviors.
 *
 * @param className - Additional CSS classes to apply to the button
 * @param icon - Optional icon to display before the button text
 * @param children - Button content (text, elements, etc.)
 * @param light - Whether to apply the light theme variant
 * @param props - All other standard HTML button attributes (onClick, disabled, type, etc.)
 * @returns A styled button element with optional icon
 */
export default function Button({ className, icon, children, light, ...props }: Props) {
  return (
    <button className={cl(styles.button, light && styles.light, className)} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
