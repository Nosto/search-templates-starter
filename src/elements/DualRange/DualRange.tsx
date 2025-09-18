import { useCallback, useRef, useState, useEffect } from "preact/hooks"
import { JSX } from "preact"
import styles from "./DualRange.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  min: number
  max: number
  value: [number | undefined, number | undefined]
  onChange: (value: [number | undefined, number | undefined]) => void
  className?: string
  id?: string
}

export default function DualRange({ min, max, value, onChange, className, id }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null)

  const minValue = value[0] ?? min
  const maxValue = value[1] ?? max

  const getPercentage = useCallback(
    (val: number) => {
      return ((val - min) / (max - min)) * 100
    },
    [min, max]
  )

  const getValueFromPercentage = useCallback(
    (percentage: number) => {
      return min + (percentage / 100) * (max - min)
    },
    [min, max]
  )

  const handleMouseDown = useCallback((handle: "min" | "max") => {
    setIsDragging(handle)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !trackRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
      const newValue = getValueFromPercentage(percentage)

      if (isDragging === "min") {
        const newMin = Math.min(newValue, maxValue)
        onChange([newMin === min ? undefined : newMin, value[1]])
      } else {
        const newMax = Math.max(newValue, minValue)
        onChange([value[0], newMax === max ? undefined : newMax])
      }
    },
    [isDragging, getValueFromPercentage, minValue, maxValue, min, max, value, onChange]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(null)
  }, [])

  // Add global event listeners for drag operations
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = "none"
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = ""
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = ""
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const minPercentage = getPercentage(minValue)
  const maxPercentage = getPercentage(maxValue)

  const handleKeyDown = useCallback(
    (e: JSX.TargetedKeyboardEvent<HTMLDivElement>, handle: "min" | "max") => {
      const step = (max - min) / 100
      let newValue: number

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault()
          newValue = handle === "min" ? Math.max(min, minValue - step) : Math.max(minValue, maxValue - step)
          break
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault()
          newValue = handle === "min" ? Math.min(maxValue, minValue + step) : Math.min(max, maxValue + step)
          break
        case "Home":
          e.preventDefault()
          newValue = handle === "min" ? min : minValue
          break
        case "End":
          e.preventDefault()
          newValue = handle === "min" ? maxValue : max
          break
        default:
          return
      }

      if (handle === "min") {
        onChange([newValue === min ? undefined : newValue, value[1]])
      } else {
        onChange([value[0], newValue === max ? undefined : newValue])
      }
    },
    [min, max, minValue, maxValue, value, onChange]
  )

  return (
    <div className={cl(styles.container, className)} id={id}>
      <div className={styles.track} ref={trackRef}>
        <div
          className={styles.range}
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`
          }}
        />
        <div
          className={cl(styles.handle, styles.minHandle, isDragging === "min" && styles.dragging)}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={() => handleMouseDown("min")}
          onKeyDown={e => handleKeyDown(e, "min")}
          tabIndex={0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minValue}
          aria-label="Minimum value"
        />
        <div
          className={cl(styles.handle, styles.maxHandle, isDragging === "max" && styles.dragging)}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={() => handleMouseDown("max")}
          onKeyDown={e => handleKeyDown(e, "max")}
          tabIndex={0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maxValue}
          aria-label="Maximum value"
        />
      </div>
      <div className={styles.labels}>
        <span className={styles.label}>{Math.round(minValue * 100) / 100}</span>
        <span className={styles.label}>{Math.round(maxValue * 100) / 100}</span>
      </div>
    </div>
  )
}
