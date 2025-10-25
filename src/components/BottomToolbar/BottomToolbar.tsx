import { useSizeOptions } from "@nosto/search-js/preact/hooks"
import { defaultConfig, sizes } from "@/config"
import Pagination from "@/components/Pagination/Pagination"
import Select from "@/elements/Select/Select"
import styles from "./BottomToolbar.module.css"

/**
 * A bottom toolbar component that provides pagination controls and items-per-page selection.
 * Displays pagination navigation and allows users to change the number of items shown per page.
 * Only shows the items-per-page selector if multiple size options are available.
 *
 * @returns A bottom toolbar with pagination and optional page size controls
 */
export default function BottomToolbar() {
  const { size, handleSizeChange, sizeOptions } = useSizeOptions(sizes, defaultConfig.serpSize)
  const options = sizeOptions.map(v => ({ value: v, label: `${v} items per page` }))

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Pagination />
        {options.length > 0 && (
          <Select
            value={size}
            onChange={e => handleSizeChange(Number((e.target as HTMLSelectElement)?.value))}
            options={options}
            label={"Items per page"}
          />
        )}
      </div>
    </div>
  )
}
