import type { Task, Observation, AgentState } from "../core/types.js";
import type { Planner } from "../planner/planner.js";
import { Runtime } from "../runtime/runtime.js";
import { EventEmitter } from "../events/event.emitter.js";

export class AgentLoop {
  constructor(
    private readonly planner: Planner,
    private readonly runtime: Runtime,
    private readonly events = new EventEmitter(),
    private readonly maxIterations = 10,
  ) {}

  async run(task: Task): Promise<AgentState> {
    const state: AgentState = {
      task,
      history: [],
      iteration: 0,
    };

    this.events.emit({
      type: "agent.started",
      taskId: task.id,
    });

    while (state.iteration < this.maxIterations) {
      this.events.emit({
        type: "planner.started",
      });

      const action = await this.planner.plan(task, state.history);

      this.events.emit({
        type: "action.created",
        action,
      });

      if (action.type === "finish") {
        break;
      }

      const observation = await this.runtime.execute(action);

      this.events.emit({
        type: "observation.created",
        observation,
      });

      state.history.push(observation);

      state.iteration++;
    }

    this.events.emit({
      type: "agent.finished",
    });

    return state;
  }
}
