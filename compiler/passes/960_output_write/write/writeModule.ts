import { OutputModule } from "../../../data/output/OutputModule.ts";
import { Writer } from "../util/Writer.ts";
import { writeFunction } from "./writeFunction.ts";
import { writeInclude } from "./writeInclude.ts";

export function writeModule(writer: Writer, outputModule: OutputModule) {
  const hash = outputModule.sourceAst.sourceToken.sourceCode.hash;
  const href = outputModule.sourceAst.sourceToken.sourceCode.sourceUrl.href;
  // Quick recap of url on top
  writer.pushBoth("//");
  writer.pushBoth(" ");
  writer.pushBoth(href);
  writer.pushBoth("\n");
  writer.pushBoth("\n");
  // Anti-reimport
  writer.pushToHeader("#ifndef __");
  writer.pushToHeader(hash);
  writer.pushToHeader("_H");
  writer.pushToHeader("\n");
  writer.pushToHeader("#define __");
  writer.pushToHeader(hash);
  writer.pushToHeader("_H");
  writer.pushToHeader("\n");
  writer.pushToHeader("\n");
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
  for (const outputFunction of outputModule.functions) {
    writeFunction(writer, outputFunction);
  }
  // Anti-reimport
  writer.pushToHeader("#endif");
  writer.pushToHeader("\n");
}
