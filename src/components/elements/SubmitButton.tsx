export default function SubmitButton({ className, text }: { className?: string; text?: string }) {
  return (
    <div className={`ns-autocomplete-submit ns-d-flex ns-justify-content-center ${className}`}>
      <button type="submit" className="ns-act-btn ns-text-align-center ns-w-100">
        {text}
      </button>
    </div>
  )
}
