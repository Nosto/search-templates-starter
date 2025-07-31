import styles from "../../styles/components/autocomplete.module.css"
import Button from "./Button"

export default function SubmitButton({ className, text }: { className?: string; text?: string }) {
  return (
    <div className={`${styles.autocompleteSubmit} ${className}`}>
      <Button name="action">{text}</Button>
    </div>
  )
}
