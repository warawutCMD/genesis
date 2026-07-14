import type { Observation } from "../core/types.js";
import type { Memory } from "./memory.js";

export class InMemoryMemory implements Memory {
  private observations: Observation[] = [];

  async add(observation: Observation): Promise<void> {
    this.observations.push(observation);
  }

  async getAll(): Promise<Observation[]> {
    return this.observations;
  }

  async clear(): Promise<void> {
    this.observations = [];
  }
}
