import { describe, expect, it } from "vitest";

import { ToolRegistry } from "../src/tools/registry.js";
import { CalculatorTool } from "../src/tools/calculator.tool.js";


describe("ToolRegistry", () => {


  it("should register and get tool", () => {

    const registry =
      new ToolRegistry();


    const calculator =
      new CalculatorTool();


    registry.register(calculator);


    const tool =
      registry.get("calculator");


    expect(tool).toBe(calculator);

  });



  it("should list tools", () => {

    const registry =
      new ToolRegistry();


    registry.register(
      new CalculatorTool()
    );


    expect(
      registry.list()
    ).toHaveLength(1);

  });


});