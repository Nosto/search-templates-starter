import { afterAll, afterEach, beforeAll } from "vitest"
import { setupServer } from "msw/node"
import { HttpHandler } from "msw"

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())

export function addHandlers(...handlers: HttpHandler[]) {
  server.use(...handlers)
}
