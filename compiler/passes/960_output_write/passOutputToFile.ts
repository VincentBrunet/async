import { OutputModule } from "../../data/output/OutputModule.ts";
import { cacheFileFromHash } from "../../lib/io/cacheFileFromHash.ts";
import { writeModule } from "./browse/writeModule.ts";
import { Writer } from "./util/Writer.ts";

export async function passOutputToFile(outputModule: OutputModule) {
  const hash = outputModule.sourceAst.sourceToken.sourceCode.hash;

  const writer = new Writer(
    await cacheFileFromHash(hash, "output.h"),
    await cacheFileFromHash(hash, "output.c"),
  );

  writeModule(outputModule);

  await writer.flush();
}
