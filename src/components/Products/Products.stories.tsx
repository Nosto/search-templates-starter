import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified Products grid demo
function ProductsDemo({
  productCount = 6,
  loading = false,
  layout = "grid"
}: {
  productCount?: number
  loading?: boolean
  layout?: "grid" | "list"
}) {
  const mockProducts = Array.from({ length: productCount }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    brand: `Brand ${String.fromCharCode(65 + (i % 3))}`,
    price: `$${(29.99 + i * 10).toFixed(2)}`,
    image: `https://via.placeholder.com/200x200?text=Product+${i + 1}`
  }))

  if (loading) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: layout === "grid" ? "repeat(auto-fill, minmax(200px, 1fr))" : "1fr",
          gap: "1rem",
          padding: "1rem",
          opacity: 0.6
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "#f5f5f5"
            }}
          >
            <div style={{ height: "150px", backgroundColor: "#ddd", marginBottom: "0.5rem" }} />
            <div style={{ height: "1rem", backgroundColor: "#ddd", marginBottom: "0.25rem" }} />
            <div style={{ height: "1rem", backgroundColor: "#ddd", width: "60%" }} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: layout === "grid" ? "repeat(auto-fill, minmax(200px, 1fr))" : "1fr",
        gap: "1rem",
        padding: "1rem"
      }}
    >
      {mockProducts.map(product => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            backgroundColor: "white",
            cursor: "pointer",
            transition: "box-shadow 0.2s",
            display: layout === "list" ? "flex" : "block",
            gap: layout === "list" ? "1rem" : "0"
          }}
        >
          <div
            style={{
              width: layout === "list" ? "120px" : "100%",
              height: layout === "list" ? "120px" : "150px",
              backgroundColor: "#f0f0f0",
              marginBottom: layout === "grid" ? "0.5rem" : "0",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            📦
          </div>
          <div style={{ flex: layout === "list" ? 1 : "none" }}>
            <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.25rem" }}>{product.brand}</div>
            <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{product.name}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#007bff" }}>{product.price}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

const meta: Meta<typeof ProductsDemo> = {
  title: "Components/Products",
  component: ProductsDemo,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"],
  argTypes: {
    productCount: {
      control: { type: "number", min: 1, max: 12 },
      description: "Number of products to display"
    },
    loading: {
      control: "boolean",
      description: "Show loading state"
    },
    layout: {
      control: "select",
      options: ["grid", "list"],
      description: "Product layout style"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Grid: Story = {
  args: {
    productCount: 6,
    loading: false,
    layout: "grid"
  }
}

export const List: Story = {
  args: {
    productCount: 4,
    loading: false,
    layout: "list"
  }
}

export const Loading: Story = {
  args: {
    productCount: 3,
    loading: true,
    layout: "grid"
  }
}

export const ManyProducts: Story = {
  args: {
    productCount: 12,
    loading: false,
    layout: "grid"
  }
}

export const SingleProduct: Story = {
  args: {
    productCount: 1,
    loading: false,
    layout: "grid"
  }
}
