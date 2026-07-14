import type { Task, Observation, AgentState } from "../core/types.js";
import type { Planner } from "../planner/planner.js";
import { Runtime } from "../runtime/runtime.js";
import { EventEmitter } from "../events/event.emitter.js";
import type { Memory } from "../memory/memory.js";

export class AgentLoop {
  constructor(
    private readonly planner: Planner,
    private readonly runtime: Runtime,
    private readonly memory: Memory,
    private readonly events = new EventEmitter(),
    private readonly maxIterations = 10,
  ) {}

  async run(task: Task): Promise<AgentState> {
    const state: AgentState = {
      task,
      history: [],
      iteration: 0,
    };

    await this.memory.clear();

    this.events.emit({
      type: "agent.started",
      taskId: task.id,
    });

    while (state.iteration < this.maxIterations) {
      this.events.emit({
        type: "planner.started",
      });

      const history = await this.memory.getAll();
      const action = await this.planner.plan(task, history);

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

      await this.memory.add(observation);
      state.history = await this.memory.getAll();

      state.iteration++;
    }

    this.events.emit({
      type: "agent.finished",
    });

    return state;
  }
}
