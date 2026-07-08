import type { Action, Observation, Task } from "../core/types.js";

import type { Planner } from "./planner.js";

export class RulePlanner implements Planner {
  async plan(task: Task, history: Observation[] = []): Promise<Action> {
    if (history.length > 0) {
      return {
        type: "finish",
        result: history[history.length - 1].output,
      };
    }

    const match = task.input.match(/calculate\s+(\d+)\s*\+\s*(\d+)/i);

    if (match) {
      return {
        type: "tool",
        toolName: "calculator",
        input: {
          a: Number(match[1]),
          b: Number(match[2]),
        },
      };
    }

    return {
      type: "finish",
      result: "I don't know",
    };
  }
}
