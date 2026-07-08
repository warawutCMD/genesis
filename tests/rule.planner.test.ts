import { describe, expect, it } from "vitest";

import { RulePlanner } from "../src/planner/rule.planner.js";

describe("RulePlanner", () => {
  it("should create calculator action", async () => {
    const planner = new RulePlanner();

    const action = await planner.plan({
      id: "1",
      input: "calculate 10 + 20",
    });

    expect(action).toEqual({
      type: "tool",
      toolName: "calculator",
      input: {
        a: 10,
        b: 20,
      },
    });
  });
});
