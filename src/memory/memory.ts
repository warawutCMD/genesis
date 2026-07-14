import type { Observation } from "../core/types.js";

export interface Memory {
  add(observation: Observation): void;

  get(): Observation[];

  clear(): void;
}
