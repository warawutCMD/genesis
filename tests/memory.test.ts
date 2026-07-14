import { describe, expect, it } from "vitest";

import { InMemoryMemory } from "../src/memory/in-memory.memory.js";

describe("Memory", () => {
  it("should store observations", async () => {
    const memory = new InMemoryMemory();

    await memory.add({
      success: true,
      output: 30,
    });

    const observations = await memory.getAll();

    expect(observations).toHaveLength(1);
    expect(observations[0].output).toBe(30);
  });

  it("should clear memory", async () => {
    const memory = new InMemoryMemory();

    await memory.add({
      success: true,
      output: 10,
    });

    await memory.clear();

    const observations = await memory.getAll();

    expect(observations).toHaveLength(0);
  });
});
