import { describe, expect, it } from "vitest";

import { EventEmitter } from "../src/events/event.emitter.js";

describe("EventEmitter", () => {
  it("should emit events to listeners", () => {
    const emitter = new EventEmitter();

    const events: any[] = [];

    emitter.subscribe((event) => {
      events.push(event);
    });

    emitter.emit({
      type: "agent.started",
      taskId: "1",
    });

    expect(events).toHaveLength(1);

    expect(events[0].type).toBe("agent.started");
  });
});
