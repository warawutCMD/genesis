import type { Action, Task, Observation } from "../core/types.js";

export interface Planner {
  plan(task: Task, history: Observation[]): Promise<Action>;
}
