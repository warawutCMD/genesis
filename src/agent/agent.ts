import type { Task, Observation } from "../core/types.js";
import type { Planner } from "../planner/planner.js";
import { Runtime } from "../runtime/runtime.js";

export class Agent {
  constructor(
    private readonly planner: Planner,
    private readonly runtime: Runtime,
  ) {}

  async run(task: Task): Promise<Observation> {
    const action = await this.planner.plan(task, []);

    return this.runtime.execute(action);
  }
}
