import type { Action, Task } from "../core/types.js";

export interface Planner {
  plan(task: Task): Promise<Action>;
}
