import type { Meta, StoryObj } from "@storybook/preact"
import { SearchProduct } from "@nosto/nosto-js/client"

// Create a simplified version of Product component for Storybook
function ProductDemo({ product, previewImage }: { product: SearchProduct; previewImage?: string }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        maxWidth: "300px",
        textDecoration: "none",
        color: "inherit"
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <img
          src={
            previewImage ?? product.imageUrl ?? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADbCAMAAAAxgQ8LAA=="
          }
          alt={product.name}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      </div>
      <div>
        {product.brand && <div style={{ fontSize: "0.9rem", color: "#666" }}>{product.brand}</div>}
        <div style={{ fontWeight: "bold", margin: "0.5rem 0" }}>{product.name}</div>
        <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          <span>{product.priceText}</span>
          {product.listPrice && product.price && product.listPrice > product.price && (
            <span style={{ textDecoration: "line-through", marginLeft: "0.5rem", color: "#999" }}>
              {product.listPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof ProductDemo> = {
  title: "Components/Product",
  component: ProductDemo,
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
    }
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
    }
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
    }
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
    }
  }
}
