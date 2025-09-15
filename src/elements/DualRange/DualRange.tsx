import { useRef, useEffect } from "preact/hooks"
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

  const minValue = value[0]
  const maxValue = value[1]
  const currentMin = minValue ?? min
  const currentMax = maxValue ?? max

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
      onChange([newMin === min ? undefined : newMin, maxValue])
    }
  }

  const handleMaxChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement
    const newMax = parseFloat(target.value)
    if (newMax >= currentMin) {
      onChange([minValue, newMax === max ? undefined : newMax])
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
          onChange={handleMinChange}
          className={cl(styles.slider, styles.sliderMin)}
          aria-label="Minimum value"
        />
        <input
          ref={maxSliderRef}
          type="range"
          min={min}
          max={max}
          value={currentMax}
          onChange={handleMaxChange}
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
