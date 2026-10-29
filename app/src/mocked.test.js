import { expect, test, vi } from "vitest";
import { value } from "../../shared/value.js";

// mocking any module turns the static import above into a dynamic one
vi.mock("./other.js");

test("static import in a file that calls vi.mock", () => {
  expect(value).toBe(1);
});
