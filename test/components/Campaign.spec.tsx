import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render } from "@testing-library/preact"
import { mockNostojs, restoreNostojs } from "@nosto/nosto-js/testing"
import Campaign from "@/components/Campaign/Campaign"

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

describe("Campaign", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    mockLoadRecommendations.mockClear()
    mockInjectCampaigns.mockClear()
    mockCreateRecommendationRequest.mockClear()
    // Default mock return value
    mockLoadRecommendations.mockResolvedValue({
      recommendations: {}
    })
    // Setup mockNostojs
    mockNostojs(mockNostoAPI)
  })

  afterEach(() => {
    vi.useRealTimers()
    restoreNostojs()
  })

  it("renders a div container after loading", async () => {
    mockLoadRecommendations.mockResolvedValue({
      recommendations: {
        "test-placement": "<div>Test Content</div>"
      }
    })

    const { container } = render(<Campaign placement="test-placement" />)

    // Initially loading, should not render div
    expect(container.querySelector("div")).toBeFalsy()

    vi.advanceTimersByTime(100)
    await vi.runAllTimersAsync()

    // After loading, should render div
    const campaignElement = container.querySelector("div")
    expect(campaignElement).toBeTruthy()
  })

  it("shows error when placement prop is empty", async () => {
    const { container } = render(<Campaign placement="" />)

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

    render(<Campaign placement="test-placement" />)

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

    render(<Campaign placement="test-placement" />)

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

    render(<Campaign placement="test-placement" />)

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

    const { container } = render(<Campaign placement="test-placement" />)

    vi.advanceTimersByTime(50)
    await vi.runAllTimersAsync()

    expect(container.textContent).toContain("Failed to load campaign")
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})
