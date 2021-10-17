import { OutputModule } from "../../data/output/OutputModule.ts";
import { stringify } from "../../lib/core/debug/stringify.ts";
import { cacheFileFromHash } from "../../lib/io/cacheFileFromHash.ts";
import { Writer } from "./util/Writer.ts";
import { writeModule } from "./write/writeModule.ts";

export async function passOutputToFile(outputModule: OutputModule) {
  const hash = outputModule.sourceAst.sourceToken.sourceCode.hash;

  const file = {
    sourceOutput: outputModule,
    header: await cacheFileFromHash(hash, "output.h"),
    source: await cacheFileFromHash(hash, "output.c"),
    object: await cacheFileFromHash(hash, "output.o"),
    main: await cacheFileFromHash(hash, "module.c"),
    meta: await cacheFileFromHash(hash, "module.json"),
  };

  const writer = new Writer(file);

  writeModule(writer, outputModule);

  await Deno.writeTextFile(
    file.object + ".json",
    stringify(outputModule),
  );

  await writer.flush();

  return file;
}
