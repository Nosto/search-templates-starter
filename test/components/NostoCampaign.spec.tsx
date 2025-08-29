import { describe, it, expect, vi, beforeEach } from "vitest"
import { render } from "@testing-library/preact"
import NostoCampaign from "@/components/NostoCampaign/NostoCampaign"

const mockLoadRecommendations = vi.fn()
const mockInjectCampaigns = vi.fn()
const mockCreateRecommendationRequest = vi.fn(() => ({
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
    vi.useFakeTimers()
    mockLoadRecommendations.mockClear()
    mockInjectCampaigns.mockClear()
    mockCreateRecommendationRequest.mockClear()
  })

  it("renders with required data attributes", async () => {
    const { container } = render(<NostoCampaign placement="test-placement" />)

    const campaignElement = container.querySelector('[data-nosto-placement="test-placement"]')
    expect(campaignElement).toBeTruthy()

    expect(campaignElement?.getAttribute("data-nosto-placement")).toBe("test-placement")
  })

  it("shows error when placement prop is empty", async () => {
    const { container } = render(<NostoCampaign placement="" />)

    vi.advanceTimersByTime(100)
    await vi.runAllTimersAsync()

    expect(container.textContent).toContain("Placement prop is required")
  })

  it("creates recommendation request with correct parameters", async () => {
    mockLoadRecommendations.mockResolvedValue({
      recommendations: {
        "test-placement": "<div>Test Content</div>"
      }
    })

    render(<NostoCampaign placement="test-placement" />)

    vi.advanceTimersByTime(50)
    await vi.runAllTimersAsync()

    expect(mockCreateRecommendationRequest).toHaveBeenCalledWith({ includeTagging: true })

    const mockRequest = mockCreateRecommendationRequest.mock.results[0].value
    expect(mockRequest.setElements).toHaveBeenCalledWith(["test-placement"])
    expect(mockRequest.setResponseMode).toHaveBeenCalledWith("HTML")
    expect(mockRequest.load).toHaveBeenCalled()
  })

  it("handles string campaign result by using API injection", async () => {
    const htmlContent = "<div>Test Campaign Content</div>"
    mockLoadRecommendations.mockResolvedValue({
      recommendations: {
        "test-placement": htmlContent
      }
    })

    render(<NostoCampaign placement="test-placement" />)

    vi.advanceTimersByTime(100)
    await vi.runAllTimersAsync()

    expect(mockInjectCampaigns).toHaveBeenCalledWith(
      { "test-placement": htmlContent },
      { "test-placement": expect.any(HTMLElement) }
    )
  })

  it("handles AttributedCampaignResult by using API injection", async () => {
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

    render(<NostoCampaign placement="test-placement" />)

    vi.advanceTimersByTime(50)
    await vi.runAllTimersAsync()

    expect(mockInjectCampaigns).toHaveBeenCalledWith(
      { "test-placement": campaignResult },
      { "test-placement": expect.any(HTMLElement) }
    )
  })

  it("handles API errors gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    mockLoadRecommendations.mockRejectedValue(new Error("API Error"))

    const { container } = render(<NostoCampaign placement="test-placement" />)

    vi.advanceTimersByTime(50)
    await vi.runAllTimersAsync()

    expect(container.textContent).toContain("Failed to load campaign")
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})
