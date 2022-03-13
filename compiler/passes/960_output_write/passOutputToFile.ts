import { FileModule } from "../../data/file/FileModule.ts";
import { OutputModule } from "../../data/output/OutputModule.ts";
import { stringify } from "../../lib/core/debug/stringify.ts";
import { cacheFileFromHash } from "../../lib/io/cacheFileFromHash.ts";
import { Writer } from "./util/Writer.ts";
import { writeModule } from "./write/writeModule.ts";
import { ensureDir } from "https://deno.land/std@0.63.0/fs/mod.ts";
import { cacheDirFromHash } from "../../lib/io/cacheDirFromHash.ts";

export async function passOutputToFile(
  outputModule: OutputModule,
): Promise<FileModule> {
  const hash = outputModule.sourceAst.sourceToken.sourceCode.hash;

  const file: FileModule = {
    sourceOutput: outputModule,
    header: cacheFileFromHash(hash, "output.h"),
    source: cacheFileFromHash(hash, "output.c"),
    object: cacheFileFromHash(hash, "output.o"),
    meta: cacheFileFromHash(hash, "module.json"),
  };

  const writer = new Writer(file);
  writeModule(writer, outputModule);
  await ensureDir(cacheDirFromHash(hash));
  await Deno.writeTextFile(
    file.object + ".json",
    stringify(outputModule),
  );
  await writer.flush();

  return file;
}
