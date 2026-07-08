import type {
  Action,
  Observation
} from "../core/types.js";

import {
  ToolRegistry
} from "../tools/registry.js";


export class Runtime {

  constructor(
    private readonly registry: ToolRegistry
  ) {}


  async execute(
    action: Action
  ): Promise<Observation> {


    if (action.type === "finish") {
      return {
        success: true,
        output: action.result
      };
    }


    const tool =
      this.registry.get(
        action.toolName
      );


    if (!tool) {

      return {
        success: false,
        error: {
          message:
            `Tool not found: ${action.toolName}`
        }
      };

    }


    try {

      const output =
        await tool.execute(
          action.input
        );


      return {
        success: true,
        output
      };


    } catch (error) {

      return {
        success: false,
        error: {
          message:
            error instanceof Error
              ? error.message
              : String(error)
        }
      };

    }

  }

}