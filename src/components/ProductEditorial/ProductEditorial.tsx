import { ReactNode } from "preact/compat"
import style from "./ProductEditorial.module.css"

type Props = {
  children?: ReactNode
}

export default function ProductEditorial({ children }: Props) {
  return <div className={style.container}>{children}</div>
}
