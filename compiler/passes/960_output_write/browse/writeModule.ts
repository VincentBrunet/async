import { OutputModule } from "../../../data/output/OutputModule.ts";
import { writeFunction } from "./writeFunction.ts";
import { writeInclude } from "./writeInclude.ts";

export function writeModule(outputModule: OutputModule) {
  for (const outputInclude of outputModule.includes) {
    writeInclude(outputInclude);
  }
  for (const outputFunction of outputModule.functions) {
    writeFunction(outputFunction);
  }
}
