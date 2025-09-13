import { JSX } from "preact/jsx-runtime"
import styles from "./Container.module.css"
import { cl } from "@nosto/search-js/utils"

type PaddingOption = "05" | "1" | "2" | "3" | "4" | "5" | "10" | "16"

type Props = {
  padding?: PaddingOption
} & JSX.IntrinsicElements["div"]

export default function Container({ className, padding, children, ...props }: Props) {
  return (
    <div className={cl(styles.container, padding && styles[`padding-${padding}`], className)} {...props}>
      {children}
    </div>
  )
}
