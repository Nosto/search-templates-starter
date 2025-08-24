import type { Meta, StoryObj } from "@storybook/preact"
import { SearchProduct } from "@nosto/nosto-js/client"

// Wrapper that renders the Product component's visual structure without Nosto dependencies
function Product({ product, previewImage, children }: { 
  product: SearchProduct; 
  previewImage?: string; 
  children?: preact.JSX.Element | preact.JSX.Element[] 
}) {
  const productImagePlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4="

  return (
    <a
      href={product.url}
      aria-label={`Product ${product.name}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
        maxWidth: "280px"
      }}
    >
      <div style={{ aspectRatio: "1", overflow: "hidden" }}>
        <img 
          src={previewImage ?? product.imageUrl ?? productImagePlaceholder} 
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "1rem" }} data-nosto-element="product">
        {product.brand && <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.25rem" }}>{product.brand}</div>}
        <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>{product.name}</div>
        <div aria-label="Price" style={{ fontSize: "1.125rem", fontWeight: "600" }}>
          <span>{product.priceText}</span>
          {product.listPrice && product.price && product.listPrice > product.price && (
            <span style={{ 
              textDecoration: "line-through", 
              marginLeft: "0.5rem", 
              color: "#64748b",
              fontSize: "1rem",
              fontWeight: "400"
            }}>
              {product.listPrice}
            </span>
          )}
        </div>
      </div>
      {children}
    </a>
  )
}

const meta: Meta<typeof Product> = {
  title: "Components/Product",
  component: Product,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    product: {
      control: "object",
      description: "Product data object"
    },
    previewImage: {
      control: "text",
      description: "Override product image URL"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    product: {
      productId: "123",
      name: "Sample Product",
      brand: "Sample Brand",
      price: 29.99,
      priceText: "$29.99",
      url: "#",
      imageUrl: ""
    } as SearchProduct
  }
}

export const WithDiscount: Story = {
  args: {
    product: {
      productId: "124",
      name: "Discounted Product",
      brand: "Sample Brand",
      price: 19.99,
      listPrice: 39.99,
      priceText: "$19.99",
      url: "#",
      imageUrl: ""
    } as SearchProduct
  }
}

export const NoBrand: Story = {
  args: {
    product: {
      productId: "125",
      name: "Generic Product Without Brand",
      price: 15.99,
      priceText: "$15.99",
      url: "#",
      imageUrl: ""
    } as SearchProduct
  }
}

export const LongName: Story = {
  args: {
    product: {
      productId: "126",
      name: "This is a Product with a Very Long Name That Might Wrap to Multiple Lines",
      brand: "Long Brand Name Here",
      price: 99.99,
      priceText: "$99.99",
      url: "#",
      imageUrl: ""
    } as SearchProduct
  }
}
