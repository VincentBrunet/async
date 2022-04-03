import { FilesModule } from '../../data/files/FilesModule.ts';
import { stringify } from '../../lib/core/debug/stringify.ts';
import { cacheFileFromHash } from '../../lib/io/cacheFileFromHash.ts';
import { Writer } from './util/Writer.ts';
import { writeModule } from './write/writeModule.ts';
import { ensureDir } from 'https://deno.land/std@0.63.0/fs/mod.ts';
import { cacheDirFromHash } from '../../lib/io/cacheDirFromHash.ts';
import { UnitModule } from '../../data/unit/UnitModule.ts';

export async function passOutputToFiles(unit: UnitModule) {
  const hash = unit.ast.hash;
  const files: FilesModule = {
    source: cacheFileFromHash(hash, 'output.cpp'),
    header: cacheFileFromHash(hash, 'output.hpp'),
    object: cacheFileFromHash(hash, 'output.o'),
    debug: cacheFileFromHash(hash, 'output.json'),
    code: cacheFileFromHash(hash, 'output.ac'),
  };

  await ensureDir(cacheDirFromHash(hash));

  const writer = new Writer(files);
  writeModule(writer, unit);
  await writer.flush();

  await Deno.writeTextFile(files.debug, stringify(unit, new Set<string>(['token'])));
  await Deno.writeTextFile(files.code, unit.code.content);

  unit.files = files;
}
