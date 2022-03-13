import { FilesModule } from "../../data/files/FilesModule.ts";
import { stringify } from "../../lib/core/debug/stringify.ts";
import { cacheFileFromHash } from "../../lib/io/cacheFileFromHash.ts";
import { Writer } from "./util/Writer.ts";
import { writeModule } from "./write/writeModule.ts";
import { ensureDir } from "https://deno.land/std@0.63.0/fs/mod.ts";
import { cacheDirFromHash } from "../../lib/io/cacheDirFromHash.ts";
import { UnitModule } from "../../data/unit/UnitModule.ts";
import { ensure } from "../../lib/errors/ensure.ts";

export async function passOutputToFiles(unit: UnitModule) {
  const hash = unit.ast.hash;
  const files: FilesModule = {
    header: cacheFileFromHash(hash, "output.h"),
    source: cacheFileFromHash(hash, "output.c"),
    object: cacheFileFromHash(hash, "output.o"),
    meta: cacheFileFromHash(hash, "module.json"),
  };

  const writer = new Writer(files);
  writeModule(writer, unit);
  await ensureDir(cacheDirFromHash(hash));
  await Deno.writeTextFile(
    files.object + ".json",
    stringify(unit.output),
  );
  await writer.flush();

  unit.files = files;
}
