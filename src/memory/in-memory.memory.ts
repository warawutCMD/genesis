import type { Observation } from "../core/types.js";

import type { Memory } from "./memory.js";

export class InMemoryMemory implements Memory {
  private observations: Observation[] = [];

  add(observation: Observation): void {
    this.observations.push(observation);
  }

  get(): Observation[] {
    return [...this.observations];
  }

  clear(): void {
    this.observations = [];
  }
}
