import type { Observation } from "../core/types.js";

export interface Memory {
  add(observation: Observation): Promise<void>;

  getAll(): Promise<Observation[]>;

  clear(): Promise<void>;
}
