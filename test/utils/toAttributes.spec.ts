import { describe, it, expect, expectTypeOf } from "vitest"
import { toAttributes } from "@/utils/toAttributes"

describe("toAttributes", () => {
  it("converts camelCased keys to kebab-case while preserving values", () => {
    const input = { fooBar: "value", bazQux: 42 }
    const result = toAttributes(input)

    expect(result).toEqual({ "foo-bar": "value", "baz-qux": 42 })
    expect(input).toEqual({ fooBar: "value", bazQux: 42 })
  })

  it("leaves lowercase and kebab-case keys unchanged", () => {
    const input = { foo: "bar", "already-kebab": true }
    const result = toAttributes(input)

    expect(result).toEqual({ foo: "bar", "already-kebab": true })
  })

  it("splits consecutive uppercase characters into separate segments", () => {
    const input = { dataID: "123", APIResponseCode: 200 }
    const result = toAttributes(input)

    expect(result).toEqual({ "data-id": "123", "apiresponse-code": 200 })
  })

  it("returns type-safe attribute keys", () => {
    const result = toAttributes({ fooBar: 1, baz: "two" })
    expectTypeOf(result).toEqualTypeOf<{ "foo-bar": number; baz: string }>()
  })
})
