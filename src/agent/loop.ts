import type { Task, Observation, AgentState } from "../core/types.js";
import type { Planner } from "../planner/planner.js";
import { Runtime } from "../runtime/runtime.js";

export class AgentLoop {
  constructor(
    private readonly planner: Planner,
    private readonly runtime: Runtime,
    private readonly maxIterations = 10,
  ) {}

  async run(task: Task): Promise<AgentState> {
    const state: AgentState = {
      task,
      history: [],
      iteration: 0,
    };

    while (state.iteration < this.maxIterations) {
      const action = await this.planner.plan(task, state.history);

      if (action.type === "finish") {
        break;
      }

      const observation = await this.runtime.execute(action);

      state.history.push(observation);

      state.iteration++;
    }

    return state;
  }
}
