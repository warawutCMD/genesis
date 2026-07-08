import type { Tool } from "./tool.js";


type CalculatorInput = {
  a: number;
  b: number;
};


export class CalculatorTool
  implements Tool<CalculatorInput, number>
{

  name = "calculator";

  description =
    "Add two numbers";


  async execute(
    input: CalculatorInput
  ): Promise<number> {

    return input.a + input.b;

  }

}