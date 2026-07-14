import { describe, expect, it } from "vitest";

import { AgentLoop } from "../src/agent/loop.js";
import { Runtime } from "../src/runtime/runtime.js";
import { ToolRegistry } from "../src/tools/registry.js";
import { CalculatorTool } from "../src/tools/calculator.tool.js";
import { RulePlanner } from "../src/planner/rule.planner.js";
import { EventEmitter } from "../src/events/event.emitter.js";

describe("AgentLoop Events", () => {
  it("should emit agent lifecycle events", async () => {
    const registry = new ToolRegistry();

    registry.register(new CalculatorTool());
    const runtime = new Runtime(registry);

    const planner = new RulePlanner();

    const events = new EventEmitter();

    const received: any[] = [];

    events.subscribe((event) => {
      received.push(event);
    });

    const loop = new AgentLoop(planner, runtime, events);

    await loop.run({
      id: "1",
      input: "calculate 10 + 20",
    });

    expect(received.map((e) => e.type)).toEqual([
      "agent.started",
      "planner.started",
      "action.created",
      "observation.created",
      "planner.started",
      "action.created",
      "agent.finished",
    ]);
  });
});
