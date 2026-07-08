import { describe, expect, it } from "vitest";
import { CalculatorTool } from "../src/tools/calculator.tool.js";


describe("CalculatorTool", () => {

  it("should add numbers", async () => {

    const tool = new CalculatorTool();

    const result = await tool.execute({
      a: 1,
      b: 2
    });


    expect(result).toBe(3);

  });

});