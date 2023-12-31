import "@testing-library/jest-dom";
// src/setupTests.js
import {server} from "./src/mocks/server.js";
// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request userHandlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())