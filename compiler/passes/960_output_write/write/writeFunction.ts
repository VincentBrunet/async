import { OutputFunction } from "../../../data/output/OutputFunction.ts";
import { Writer } from "../util/Writer.ts";
import { writeBlock } from "./writeBlock.ts";

export function writeFunction(writer: Writer, outputFunction: OutputFunction) {
  // Function definition
  writer.pushBoth(outputFunction.type);
  writer.pushBoth(outputFunction.name);
  writer.pushBoth("(");
  writer.pushBoth(outputFunction.params.join(","));
  writer.pushBoth(")");
  // Header doesn't have a block
  writer.pushToHeader(";");
  // Source needs the full source
  writeBlock(writer, outputFunction.block, 0);
  // Done
  writer.pushBoth("\n");
  writer.pushBoth("\n");
}
