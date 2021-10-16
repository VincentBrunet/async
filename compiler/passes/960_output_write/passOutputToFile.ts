import { OutputModule } from "../../data/output/OutputModule.ts";
import { writeModule } from "./browse/writeModule.ts";
import { Writer } from "./util/Writer.ts";

export async function passOutputToFile(outputModule: OutputModule) {
  const dir = outputModule.sourceAst.sourceToken.sourceCode.cache;

  const writer = new Writer(
    dir + "/output.h",
    dir + "/output.c",
  );

  writeModule(outputModule);

  return await writer.flush();
}
