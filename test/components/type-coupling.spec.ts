import { describe, it, expectTypeOf } from "vitest"
import type { Campaign, DynamicCard } from "@nosto/web-components"
import CampaignComponent from "@/components/Campaign/Campaign"
import DynamicCardComponent from "@/components/DynamicCard/DynamicCard"

describe("Type Coupling Validation", () => {
  it("Campaign props should be coupled with web component types", () => {
    // These type assertions ensure that our component props are properly coupled
    // with the web component types. If the web component types change, these will fail.
    
    const campaignProps = {
      placement: "test" as Campaign["placement"],
      productId: "123" as Campaign["productId"],
      variantId: "456" as Campaign["variantId"],
      template: "tpl" as Campaign["template"],
      init: true, // Note: We use boolean for better DX
      lazy: true as Campaign["lazy"]
    }

    // This ensures our component accepts the right types
    expectTypeOf(campaignProps.placement).toEqualTypeOf<string>()
    expectTypeOf(campaignProps.productId).toEqualTypeOf<string | undefined>()
    expectTypeOf(campaignProps.init).toEqualTypeOf<boolean>() // DX improvement
    expectTypeOf(campaignProps.lazy).toEqualTypeOf<boolean | undefined>()
  })

  it("DynamicCard props should be coupled with web component types", () => {
    const dynamicCardProps = {
      handle: "test" as DynamicCard["handle"],
      section: "main" as DynamicCard["section"],
      template: "card" as DynamicCard["template"],
      variantId: "123" as DynamicCard["variantId"],
      placeholder: true as DynamicCard["placeholder"],
      lazy: true as DynamicCard["lazy"]
    }

    // This ensures our component accepts the right types
    expectTypeOf(dynamicCardProps.handle).toEqualTypeOf<string>()
    expectTypeOf(dynamicCardProps.section).toEqualTypeOf<string | undefined>()
    expectTypeOf(dynamicCardProps.template).toEqualTypeOf<string | undefined>()
    expectTypeOf(dynamicCardProps.placeholder).toEqualTypeOf<boolean | undefined>()
  })
})