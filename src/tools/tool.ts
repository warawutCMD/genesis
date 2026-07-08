export interface Tool<Input = unknown, Output = unknown> {
  name: string;

  description: string;

  execute(input: Input): Promise<Output>;
}
