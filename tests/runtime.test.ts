import { describe, expect, it } from "vitest";
import { Runtime } from "../src/runtime/runtime.js";
import { ToolRegistry } from "../src/tools/registry.js";
import { CalculatorTool } from "../src/tools/calculator.tool.js";

describe("Runtime", () => {
  it("should execute tool action", async () => {
    const registry = new ToolRegistry();

    registry.register(new CalculatorTool());

    const runtime = new Runtime(registry);

    const result = await runtime.execute({
      type: "tool",
      toolName: "calculator",
      input: {
        a: 10,
        b: 20,
      },
    });

    expect(result.success).toBe(true);

    expect(result.output).toBe(30);
  });
});
