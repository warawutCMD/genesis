export type AgentEvent =
  | {
      type: "agent.started";
      taskId: string;
    }
  | {
      type: "planner.started";
    }
  | {
      type: "action.created";
      action: unknown;
    }
  | {
      type: "observation.created";
      observation: unknown;
    }
  | {
      type: "agent.finished";
    };
