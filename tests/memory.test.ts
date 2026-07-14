import { describe, expect, it } from "vitest";

import { InMemoryMemory } from "../src/memory/in-memory.memory.js";

describe("Memory", () => {
  it("should store observations", () => {
    const memory = new InMemoryMemory();

    memory.add({
      success: true,
      output: 30,
    });

    expect(memory.get()).toHaveLength(1);

    expect(memory.get()[0].output).toBe(30);
  });

  it("should clear memory", () => {
    const memory = new InMemoryMemory();

    memory.add({
      success: true,
      output: 10,
    });

    memory.clear();

    expect(memory.get()).toHaveLength(0);
  });
});
