import { describe, expect, it } from "vitest";
import { Agent } from "../src/agent/agent.js";
import { Runtime } from "../src/runtime/runtime.js";
import { ToolRegistry } from "../src/tools/registry.js";
import { CalculatorTool } from "../src/tools/calculator.tool.js";
import { RulePlanner } from "../src/planner/rule.planner.js";

describe("Agent", () => {
  it("should execute task through planner and runtime", async () => {
    const registry = new ToolRegistry();
    registry.register(new CalculatorTool());
    const runtime = new Runtime(registry);
    const planner = new RulePlanner();
    const agent = new Agent(planner, runtime);
    const result = await agent.run({
      id: "1",
      input: "calculate 10 + 20",
    });
    expect(result.success).toBe(true);
    expect(result.output).toBe(30);
  });
});
