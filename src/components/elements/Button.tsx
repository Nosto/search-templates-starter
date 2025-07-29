import { JSX } from "preact/jsx-runtime"
import styles from "../../styles/elements/button.module.css"

export default function Button({ className, name, children, ...props }: JSX.IntrinsicElements["button"]) {
  const style = name ? styles[`button-${name}`] : ""

  return (
    <button type="submit" className={`${style} ${className}`} {...props}>
      {children}
    </button>
  )
}
