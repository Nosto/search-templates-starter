import { ComponentChildren } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { onFallback } from "@/config"

type Props = {
  children: ComponentChildren
}

/**
 * Error boundary that falls back to native content when the template fails to render
 */
export default function FallbackBoundary({ children }: Props) {
  const [error] = useErrorBoundary()

  // the fallback unmounts the whole template, which must wait until Preact has finished the failed render
  useEffect(() => {
    if (error) {
      onFallback({ reason: error })
    }
  }, [error])

  return error ? null : <>{children}</>
}
