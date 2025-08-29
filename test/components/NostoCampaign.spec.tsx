import { describe, it, expect, vi, beforeEach } from "vitest"
import { render } from "preact"
import NostoCampaign from "../../src/components/NostoCampaign/NostoCampaign"

// Mock @nosto/nosto-js
const mockLoadRecommendations = vi.fn()
const mockInjectCampaigns = vi.fn()
const mockCreateRecommendationRequest = vi.fn(() => ({
  disableCampaignInjection: vi.fn().mockReturnThis(),
  setElements: vi.fn().mockReturnThis(),
  setResponseMode: vi.fn().mockReturnThis(),
  load: mockLoadRecommendations
}))

const mockNostoAPI = {
  createRecommendationRequest: mockCreateRecommendationRequest,
  placements: {
    injectCampaigns: mockInjectCampaigns
  }
}

vi.mock("@nosto/nosto-js", () => ({
  nostojs: vi.fn(callback => callback(mockNostoAPI))
}))

describe("NostoCampaign", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLoadRecommendations.mockClear()
    mockInjectCampaigns.mockClear()
    mockCreateRecommendationRequest.mockClear()
  })

  it("renders with required data attributes", async () => {
    const container = document.createElement("div")
    render(<NostoCampaign placement="test-placement" />, container)

    const campaignElement = container.querySelector('[data-nosto-placement="test-placement"]')
    expect(campaignElement).toBeTruthy()

    // Check that the placement attribute is set correctly
    expect(campaignElement?.getAttribute("data-nosto-placement")).toBe("test-placement")
  })

  it("shows error when placement prop is empty", async () => {
    const container = document.createElement("div")
    render(<NostoCampaign placement="" />, container)

    // Wait longer for the effect to run
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(container.textContent).toContain("Placement prop is required")
  })

  it("creates recommendation request with correct parameters", async () => {
    mockLoadRecommendations.mockResolvedValue({
      recommendations: {
        "test-placement": "<div>Test Content</div>"
      }
    })

    const container = document.createElement("div")
    render(<NostoCampaign placement="test-placement" />, container)

    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(mockCreateRecommendationRequest).toHaveBeenCalledWith({ includeTagging: true })

    const mockRequest = mockCreateRecommendationRequest.mock.results[0].value
    expect(mockRequest.disableCampaignInjection).toHaveBeenCalled()
    expect(mockRequest.setElements).toHaveBeenCalledWith(["test-placement"])
    expect(mockRequest.setResponseMode).toHaveBeenCalledWith("HTML")
    expect(mockRequest.load).toHaveBeenCalled()
  })

  it("handles string campaign result by setting innerHTML", async () => {
    const htmlContent = "<div>Test Campaign Content</div>"
    mockLoadRecommendations.mockResolvedValue({
      recommendations: {
        "test-placement": htmlContent
      }
    })

    const container = document.createElement("div")
    render(<NostoCampaign placement="test-placement" />, container)

    // Wait for async operation to complete
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find content element by class name or data attribute - it might not have the exact class
    const contentElements = container.querySelectorAll("div")
    const contentWithHTML = Array.from(contentElements).find(el => el.innerHTML === htmlContent)

    expect(contentWithHTML).toBeTruthy()
    expect(contentWithHTML?.innerHTML).toBe(htmlContent)
    expect(mockInjectCampaigns).not.toHaveBeenCalled()
  })

  it("handles AttributedCampaignResult by using placements.injectCampaigns", async () => {
    const campaignResult = {
      div_id: "test-div",
      html: "<div>Attributed Campaign</div>",
      result_id: "result-123"
    }

    mockLoadRecommendations.mockResolvedValue({
      recommendations: {
        "test-placement": campaignResult
      }
    })

    const container = document.createElement("div")
    render(<NostoCampaign placement="test-placement" />, container)

    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(mockInjectCampaigns).toHaveBeenCalledWith({ "test-placement": campaignResult }, expect.any(Object))
  })

  it("handles API errors gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    mockLoadRecommendations.mockRejectedValue(new Error("API Error"))

    const container = document.createElement("div")
    render(<NostoCampaign placement="test-placement" />, container)

    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(container.textContent).toContain("Failed to load campaign")
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})
