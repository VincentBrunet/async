import { OutputFunction } from "../../../data/output/OutputFunction.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeFunction(outputFunction: OutputFunction) {
  for (const outputStatement of outputFunction.statements) {
    writeStatement(outputStatement);
  }
}
