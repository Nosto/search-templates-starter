import { useRef, useEffect, useState } from "preact/hooks"
import styles from "./DualRange.module.css"
import { cl } from "@nosto/search-js/utils"

type DualRangeProps = {
  min: number
  max: number
  value: number[]
  onChange: (value: [number | undefined, number | undefined]) => void
  id?: string
  className?: string
}

export default function DualRange({ min, max, value, onChange, id, className }: DualRangeProps) {
  const minSliderRef = useRef<HTMLInputElement>(null)
  const maxSliderRef = useRef<HTMLInputElement>(null)
  const rangeRef = useRef<HTMLDivElement>(null)

  // Track dragging state and temporary values during drag
  const [isDragging, setIsDragging] = useState(false)
  const [dragValues, setDragValues] = useState<[number | undefined, number | undefined]>([undefined, undefined])

  const minValue = value[0]
  const maxValue = value[1]
  const currentMin = (isDragging ? dragValues[0] : minValue) ?? min
  const currentMax = (isDragging ? dragValues[1] : maxValue) ?? max

  // Update the visual track fill when values change
  useEffect(() => {
    if (rangeRef.current && minSliderRef.current && maxSliderRef.current) {
      const range = max - min
      const leftPercent = ((currentMin - min) / range) * 100
      const rightPercent = ((currentMax - min) / range) * 100

      rangeRef.current.style.left = `${leftPercent}%`
      rangeRef.current.style.width = `${rightPercent - leftPercent}%`
    }
  }, [currentMin, currentMax, min, max])

  const handleMinChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement
    const newMin = parseFloat(target.value)
    if (newMin <= currentMax) {
      const newValue: [number | undefined, number | undefined] = [
        newMin === min ? undefined : newMin,
        isDragging ? dragValues[1] : maxValue
      ]

      if (isDragging) {
        // Update visual representation during drag
        setDragValues(newValue)
      } else {
        // Immediate change when not dragging (e.g., keyboard input)
        onChange(newValue)
      }
    }
  }

  const handleMaxChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement
    const newMax = parseFloat(target.value)
    if (newMax >= currentMin) {
      const newValue: [number | undefined, number | undefined] = [
        isDragging ? dragValues[0] : minValue,
        newMax === max ? undefined : newMax
      ]

      if (isDragging) {
        // Update visual representation during drag
        setDragValues(newValue)
      } else {
        // Immediate change when not dragging (e.g., keyboard input)
        onChange(newValue)
      }
    }
  }

  const handleDragStart = () => {
    setIsDragging(true)
    setDragValues([minValue, maxValue])
  }

  const handleDragEnd = () => {
    if (isDragging) {
      // Commit the changes when drag ends
      onChange(dragValues)
      setIsDragging(false)
      setDragValues([undefined, undefined])
    }
  }

  return (
    <div className={cl(styles.dualRange, className)} id={id}>
      <div className={styles.sliderContainer}>
        <div className={styles.track}>
          <div className={styles.range} ref={rangeRef} />
        </div>
        <input
          ref={minSliderRef}
          type="range"
          min={min}
          max={max}
          value={currentMin}
          onInput={handleMinChange}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          className={cl(styles.slider, styles.sliderMin)}
          aria-label="Minimum value"
        />
        <input
          ref={maxSliderRef}
          type="range"
          min={min}
          max={max}
          value={currentMax}
          onInput={handleMaxChange}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          className={cl(styles.slider, styles.sliderMax)}
          aria-label="Maximum value"
        />
      </div>
      <div className={styles.values}>
        <span className={styles.value}>{currentMin}</span>
        <span className={styles.separator}>-</span>
        <span className={styles.value}>{currentMax}</span>
      </div>
    </div>
  )
}
