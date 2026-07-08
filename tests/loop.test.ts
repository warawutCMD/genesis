import { describe, expect, it } from "vitest";
import { AgentLoop } from "../src/agent/loop.js";
import { Runtime } from "../src/runtime/runtime.js";
import { ToolRegistry } from "../src/tools/registry.js";
import { CalculatorTool } from "../src/tools/calculator.tool.js";
import { RulePlanner } from "../src/planner/rule.planner.js";

describe("AgentLoop", () => {
  it("should run planner and runtime loop", async () => {
    const registry = new ToolRegistry();

    registry.register(new CalculatorTool());

    const runtime = new Runtime(registry);

    const planner = new RulePlanner();

    const loop = new AgentLoop(planner, runtime);

    const state = await loop.run({
      id: "1",
      input: "calculate 10 + 20",
    });

    expect(state.iteration).toBe(1);
    expect(state.history).toHaveLength(1);

    expect(state.history[0].output).toBe(30);
  });
});
