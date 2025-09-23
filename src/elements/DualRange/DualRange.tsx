import { useCallback, useRef, useState, useEffect } from "preact/hooks"
import styles from "./DualRange.module.css"
import { cl } from "@nosto/search-js/utils"

type Range = [number | undefined, number | undefined]

type Props = {
  min: number
  max: number
  value: Range
  onChange: (value: Range) => void
  className?: string
  id?: string
}

export default function DualRange({ min, max, value, onChange, className, id }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null)
  const [dragValues, setDragValues] = useState<Range>(value)

  // Use drag values during dragging, otherwise use the prop values
  const currentValues = isDragging ? dragValues : value
  const minValue = currentValues[0] ?? min
  const maxValue = currentValues[1] ?? max

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

  const handleMouseDown = useCallback(
    (handle: "min" | "max") => {
      setIsDragging(handle)
      setDragValues(value) // Initialize drag values with current prop values
    },
    [value]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !trackRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
      const newValue = getValueFromPercentage(percentage)

      // Update local drag state for visual feedback, but don't call onChange yet
      if (isDragging === "min") {
        const newMin = Math.min(newValue, maxValue)
        setDragValues([newMin === min ? undefined : newMin, dragValues[1]])
      } else {
        const newMax = Math.max(newValue, minValue)
        setDragValues([dragValues[0], newMax === max ? undefined : newMax])
      }
    },
    [isDragging, getValueFromPercentage, minValue, maxValue, min, max, dragValues]
  )

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      // Commit the drag values to the parent component via onChange
      onChange(dragValues)
    }
    setIsDragging(null)
  }, [isDragging, dragValues, onChange])

  // Sync drag values with prop values when not dragging
  useEffect(() => {
    if (!isDragging) {
      setDragValues(value)
    }
  }, [value, isDragging])

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
          className={cl(styles.handle, isDragging === "min" && styles.dragging)}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={() => handleMouseDown("min")}
          role="slider"
          tabIndex={-1}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minValue}
          aria-label="Minimum value"
        />
        <div
          className={cl(styles.handle, isDragging === "max" && styles.dragging)}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={() => handleMouseDown("max")}
          role="slider"
          tabIndex={-1}
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
