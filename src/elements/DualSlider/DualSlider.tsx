import { useState, useEffect, useRef, useCallback } from "preact/hooks"
import { JSX } from "preact"
import styles from "./DualSlider.module.css"
import { cl } from "@nosto/search-js/utils"

type Range = [number | undefined, number | undefined]

type Props = {
  min: number
  max: number
  values: Range
  onChange: (values: Range) => void
  className?: string
}

function getPercentage(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100
}

export default function DualSlider({ min, max, values, onChange, className }: Props) {
  // Convert undefined values to min/max bounds
  const normalizedValues = [values[0] !== undefined ? values[0] : min, values[1] !== undefined ? values[1] : max]

  const [internalValues, setInternalValues] = useState<[number, number]>([normalizedValues[0], normalizedValues[1]])
  const [isDragging, setIsDragging] = useState<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Update internal values when props change
  useEffect(() => {
    const newNormalizedValues: [number, number] = [
      values[0] !== undefined ? values[0] : min,
      values[1] !== undefined ? values[1] : max
    ]
    setInternalValues(newNormalizedValues)
  }, [values, min, max])

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min
      const rect = trackRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      return Math.round(min + percentage * (max - min))
    },
    [min, max]
  )

  const handleMouseDown = (thumbIndex: number) => (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(thumbIndex)
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging === null) return
      const newValue = getValueFromPosition(e.clientX)
      const newValues: [number, number] = [...internalValues]

      if (isDragging === 0) {
        // Left thumb - ensure it doesn't exceed right thumb
        newValues[0] = Math.min(newValue, internalValues[1])
      } else {
        // Right thumb - ensure it doesn't go below left thumb
        newValues[1] = Math.max(newValue, internalValues[0])
      }

      setInternalValues(newValues)
    },
    [isDragging, internalValues, getValueFromPosition]
  )

  const handleMouseUp = useCallback(() => {
    if (isDragging !== null) {
      onChange([
        internalValues[0] === min ? undefined : internalValues[0],
        internalValues[1] === max ? undefined : internalValues[1]
      ])
    }
    setIsDragging(null)
  }, [isDragging, internalValues, min, max, onChange])

  // Attach global mouse events for dragging
  useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleKeyDown = (thumbIndex: number) => (e: JSX.TargetedKeyboardEvent<HTMLDivElement>) => {
    let newValue = internalValues[thumbIndex]
    const step = Math.max(1, Math.round((max - min) / 100))

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        newValue = Math.max(min, newValue - step)
        break
      case "ArrowRight":
      case "ArrowUp":
        newValue = Math.min(max, newValue + step)
        break
      case "Home":
        newValue = min
        break
      case "End":
        newValue = max
        break
      default:
        return
    }

    e.preventDefault()
    const newValues: [number, number] = [...internalValues]

    if (thumbIndex === 0) {
      newValues[0] = Math.min(newValue, internalValues[1])
    } else {
      newValues[1] = Math.max(newValue, internalValues[0])
    }

    setInternalValues(newValues)
    onChange([newValues[0] === min ? undefined : newValues[0], newValues[1] === max ? undefined : newValues[1]])
  }

  const leftPercentage = getPercentage(internalValues[0], min, max)
  const rightPercentage = getPercentage(internalValues[1], min, max)

  return (
    <div className={cl(styles.container, className)}>
      <div className={styles.sliderWrapper}>
        <div ref={trackRef} className={styles.track} aria-valuemin={min} aria-valuemax={max}>
          <div
            className={styles.trackHighlight}
            style={{
              left: `${leftPercentage}%`,
              width: `${rightPercentage - leftPercentage}%`
            }}
          />
          <div
            className={cl(styles.thumb, isDragging === 0 && styles.thumbActive)}
            style={{ left: `${leftPercentage}%` }}
            onMouseDown={handleMouseDown(0)}
            onKeyDown={handleKeyDown(0)}
            aria-label="Range minimum value"
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={internalValues[0]}
            tabIndex={0}
          />
          <div
            className={cl(styles.thumb, isDragging === 1 && styles.thumbActive)}
            style={{ left: `${rightPercentage}%` }}
            onMouseDown={handleMouseDown(1)}
            onKeyDown={handleKeyDown(1)}
            aria-label="Range maximum value"
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={internalValues[1]}
            tabIndex={0}
          />
        </div>
      </div>
      <div className={styles.values}>
        <span className={styles.value}>{internalValues[0]}</span>
        <span className={styles.valueSeparator}>-</span>
        <span className={styles.value}>{internalValues[1]}</span>
      </div>
    </div>
  )
}
