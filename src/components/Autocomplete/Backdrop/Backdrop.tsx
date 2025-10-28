import style from "./Backdrop.module.css"

type BackdropProps = {
  isVisible: boolean
  onClick: () => void
}

export default function Backdrop({ isVisible, onClick }: BackdropProps) {
  if (!isVisible) {
    return null
  }

  return <div className={style.backdrop} onClick={onClick} aria-hidden="true" />
}
