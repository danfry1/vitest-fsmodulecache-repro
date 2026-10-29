import { expect, test } from "vitest";

test("dynamic import from a subdirectory", async () => {
  const { value } = await import("../../shared/value.js");
  expect(value).toBe(1);
});
