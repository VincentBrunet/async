import { OutputModule } from "../../../data/output/OutputModule.ts";
import { Writer } from "../util/Writer.ts";
import { writeFunction } from "./writeFunction.ts";
import { writeInclude } from "./writeInclude.ts";

export function writeModule(writer: Writer, outputModule: OutputModule) {
  // Quick recap on top
  writer.pushBoth("//");
  writer.pushBoth(" ");
  writer.pushBoth(outputModule.sourceAst.sourceToken.sourceCode.sourceUrl.href);
  writer.pushBoth("\n");
  writer.pushBoth("\n");
  // Quick recap on top
  writer.pushBoth("#include <runtime.h>");
  writer.pushBoth("\n");
  writer.pushBoth("\n");
  // Includes
  if (outputModule.includes.length) {
    for (const outputInclude of outputModule.includes) {
      writeInclude(writer, outputInclude);
    }
    writer.pushBoth("\n");
  }
  // Functions
  if (outputModule.functions.length) {
    for (const outputFunction of outputModule.functions) {
      writeFunction(writer, outputFunction);
    }
    writer.pushBoth("\n");
  }
}
