import type { AgentEvent } from "./types.js";

type Listener = (event: AgentEvent) => void;

export class EventEmitter {
  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  emit(event: AgentEvent) {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}
