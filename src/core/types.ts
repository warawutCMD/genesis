export type Task = {
  id: string;
  input: string;
};


export type Action =
  | {
      type: "tool";
      toolName: string;
      input: unknown;
    }
  | {
      type: "finish";
      result: unknown;
    };


export type Observation = {
  success: boolean;
  output?: unknown;
  error?: {
    message: string;
  };
};


export type ExecutionState =
  | "pending"
  | "running"
  | "completed"
  | "failed";

export type ExecutionContext = {
  taskId: string;
};