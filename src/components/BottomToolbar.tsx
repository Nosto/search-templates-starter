import { useSizeOptions } from "@nosto/search-js/preact/hooks"
import { defaultConfig, sizes } from "../config"
import Pagination from "./Pagination"
import Select from "./elements/Select"
import styles from "./BottomToolbar.module.css"

export default function BottomToolbar() {
  const { from, to, size, total, handleSizeChange, sizeOptions } = useSizeOptions(sizes, defaultConfig.serpSize)
  const options = sizeOptions.map(v => ({ value: v, label: `${v} items per page` }))

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          {from} - {total < to ? total : to} of {total} items
        </div>
        {sizeOptions.length > 0 && (
          <Select
            value={size}
            onChange={e => handleSizeChange(Number((e.target as HTMLSelectElement)?.value))}
            options={options}
            label={"Items per page"}
          />
        )}
      </div>
      <Pagination />
    </div>
  )
}
