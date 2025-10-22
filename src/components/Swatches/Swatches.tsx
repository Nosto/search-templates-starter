import { useShopifyProduct } from "@nosto/search-js/preact/hooks"
import { useState, useCallback } from "preact/hooks"
import { cl } from "@nosto/search-js/utils"
import styles from "./Swatches.module.css"

// Local type definitions based on @nosto/search-js types
interface ShopifyVariant {
  id: number
  title: string
  option1: string | null
  option2: string | null
  option3: string | null
  sku: string
  requires_shipping: boolean
  taxable: boolean
  featured_image: unknown
  available: boolean
  name: string
  public_title: string
  options: string[]
  price: number
  weight: number
  compare_at_price: number | null
  inventory_management: string
  barcode: string
  featured_media: unknown
}

interface ShopifyOption {
  name: string
  position: number
  values: string[]
}

interface ShopifyProduct {
  id: number
  title: string
  handle: string
  description: string
  published_at: string
  created_at: string
  vendor: string
  type: string
  tags: string[]
  price: number
  price_min: number
  price_max: number
  available: boolean
  price_varies: boolean
  compare_at_price: number | null
  compare_at_price_min: number
  compare_at_price_max: number
  compare_at_price_varies: boolean
  variants: ShopifyVariant[]
  images: string[]
  featured_image: string
  options: ShopifyOption[]
  url: string
}

export type Props = {
  handle: string
  /** Whether to preselect the first available option for each variant */
  preselect?: boolean
  /** Callback fired when variant selection changes */
  onVariantChange?: (variant: ShopifyVariant | null, product: ShopifyProduct) => void
  /** Custom className for the root element */
  className?: string
}

export default function Swatches({ handle, preselect = false, onVariantChange, className }: Props) {
  const { product, loading, error } = useShopifyProduct(handle)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  // Initialize default selections when product loads
  const initializeSelections = useCallback(() => {
    if (!product?.options) return

    const newSelections: Record<string, string> = {}
    product.options.forEach(option => {
      // Always auto-select single-value options, or multi-value options when preselect is true
      if (option.values.length === 1 || (preselect && option.values.length > 1)) {
        newSelections[option.name] = option.values[0]
      }
    })
    setSelectedOptions(newSelections)
  }, [product, preselect])

  // Initialize selections when product changes
  if (product && Object.keys(selectedOptions).length === 0) {
    initializeSelections()
  }

  const handleOptionSelect = (optionName: string, value: string) => {
    if (!product) return

    const newSelections = {
      ...selectedOptions,
      [optionName]: value
    }
    setSelectedOptions(newSelections)

    // Find matching variant and fire callback
    const variant = getSelectedVariant(newSelections, product)
    if (onVariantChange) {
      onVariantChange(variant, product)
    }
  }

  const getSelectedVariant = (selections: Record<string, string>, product: ShopifyProduct): ShopifyVariant | null => {
    return (
      product.variants?.find((variant: ShopifyVariant) => {
        return product.options.every((option: ShopifyOption, index: number) => {
          const selectedValue = selections[option.name]
          const variantValue = variant.options[index]
          return selectedValue === variantValue
        })
      }) || null
    )
  }

  const isOptionUnavailable = (optionName: string, value: string): boolean => {
    if (!product) return false

    // Check if this option value exists in any available variant
    const availableOptions = new Set<string>()
    const optionNames = product.options.map(option => option.name)

    product.variants
      .filter(v => v.available)
      .forEach(variant => {
        variant.options.forEach((optionValue, i) => {
          availableOptions.add(`${optionNames[i]}::${optionValue}`)
        })
      })

    return !availableOptions.has(`${optionName}::${value}`)
  }

  // Don't render if there's an error or no product
  if (error || !product) {
    return null
  }

  // Don't render if there are no options or only one variant
  if (!product.options || product.options.length === 0 || product.variants.length <= 1) {
    return null
  }

  return (
    <div className={cl(styles.selector, className)} data-loading={loading}>
      {product.options.map(option => {
        // Don't render single-value options
        if (option.values.length <= 1) {
          return null
        }

        return (
          <div key={option.name} className={styles.row}>
            <div className={styles.label}>{option.name}:</div>
            <div className={styles.values}>
              {option.values.map(value => {
                const isActive = selectedOptions[option.name] === value
                const isUnavailable = isOptionUnavailable(option.name, value)

                return (
                  <button
                    key={value}
                    type="button"
                    className={styles.value}
                    data-active={isActive}
                    data-unavailable={isUnavailable}
                    disabled={isUnavailable}
                    onClick={() => handleOptionSelect(option.name, value)}
                    aria-label={`Select ${option.name}: ${value}`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
