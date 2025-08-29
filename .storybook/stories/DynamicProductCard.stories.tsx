import type { Meta, StoryObj } from "@storybook/preact"
import DynamicProductCard, {
  type DynamicProductCardProps
} from "../../src/components/DynamicProductCard/DynamicProductCard"

const meta: Meta<DynamicProductCardProps> = {
  title: "Components/DynamicProductCard",
  component: DynamicProductCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A simplified component that fetches product card markup from Shopify with Section Rendering support,
similar to the NostoDynamicCard web component. This component fetches product data 
dynamically using either a template or section approach.

**Note**: This component requires a Shopify environment to function properly. The stories
below show the component structure that would appear in a real environment.
        `
      }
    }
  },
  argTypes: {
    handle: {
      control: "text",
      description: "The product handle to fetch data for (required)"
    },
    template: {
      control: "text",
      description: "Template to use for rendering (either template or section required)"
    },
    section: {
      control: "text",
      description: "Section ID to use for rendering (either template or section required)"
    },
    variantId: {
      control: "text",
      description: "Specific variant ID to fetch (optional)"
    }
  }
} satisfies Meta<DynamicProductCardProps>

export default meta
type Story = StoryObj<DynamicProductCardProps>

// Mock fetch for Storybook stories
const mockFetch = (mockResponse: string, delay = 500) => {
  // Simple mock for demonstration purposes
  if (typeof window !== "undefined") {
    const originalFetch = window.fetch
    window.fetch = () =>
      new Promise(resolve =>
        setTimeout(() => {
          resolve({
            ok: true,
            text: () => Promise.resolve(mockResponse)
          } as Response)
        }, delay)
      )

    // Restore after some time (for demo purposes)
    setTimeout(() => {
      window.fetch = originalFetch
    }, delay + 1000)
  }
}

export const WithTemplate: Story = {
  args: {
    handle: "awesome-product",
    template: "product-card",
    variantId: "12345"
  },
  beforeEach: () => {
    mockFetch(
      `
      <div class="product-card">
        <div class="product-image">
          <img src="https://picsum.photos/300/300" alt="Awesome Product" />
        </div>
        <div class="product-info">
          <h3>Awesome Product</h3>
          <div class="product-price">$99.99</div>
          <div class="product-brand">Brand Name</div>
        </div>
      </div>
    `,
      500
    )
  }
}

export const WithSection: Story = {
  args: {
    handle: "awesome-product",
    section: "product-card-section"
  },
  beforeEach: () => {
    mockFetch(
      `
      <html>
        <body>
          <section>
            <div class="section-product-card">
              <div class="product-image">
                <img src="https://picsum.photos/300/300" alt="Section Product" />
              </div>
              <div class="product-details">
                <h2>Section Rendered Product</h2>
                <p class="price">$149.99</p>
                <button>Add to Cart</button>
              </div>
            </div>
          </section>
        </body>
      </html>
    `,
      500
    )
  }
}

export const ErrorState: Story = {
  args: {
    handle: "nonexistent-product",
    template: "product-card"
  },
  beforeEach: () => {
    if (typeof window !== "undefined") {
      window.fetch = () =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "Not Found"
        } as Response)
    }
  }
}
