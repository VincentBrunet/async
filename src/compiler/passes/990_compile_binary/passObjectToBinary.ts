import { expandGlob } from 'https://deno.land/std@0.63.0/fs/mod.ts';
import { UnitModule } from '../../data/unit/UnitModule.ts';
import { ensure } from '../../passes/errors/ensure.ts';
import { hashGlobalSymbol } from '../../passes/hash/hashGlobalSymbol.ts';
import { cacheFileFromHash } from '../../lib/io/cacheFileFromHash.ts';
import { compileCommand } from '../../lib/io/compileCommand.ts';

const stdlibs = new Array<string>();
for await (const file of expandGlob('src/stdlib/**/*.c')) {
  stdlibs.push(file.path);
}

export async function passObjectToBinary(
  unit: UnitModule,
  units: Array<UnitModule>,
) {
  const hash = unit.ast.hash;

  const mainPath = await Deno.makeTempFile({
    suffix: '.c',
  });

  const mainContent = new Array<string>();
  mainContent.push('#include <runtime.h>\n');
  mainContent.push('\n');
  mainContent.push('#include');
  mainContent.push(' ');
  mainContent.push('<');
  mainContent.push(cacheFileFromHash(hash, 'output.h'));
  mainContent.push('>');
  mainContent.push('\n');
  mainContent.push('\n');
  mainContent.push('t_module (*entry_module)() = ');
  mainContent.push(hashGlobalSymbol(hash, unit.ast, 'module'));
  mainContent.push(';');
  mainContent.push('\n');

  await Deno.writeTextFile(
    mainPath,
    mainContent.join(''),
  );

  const compileBinary = await compileCommand(
    [
      '-Wall',
      '-Wpedantic',
      '-I',
      'src/stdlib',
      ...units.map((unit) => ensure(unit.files, unit.toString()).object),
      mainPath,
      ...stdlibs,
    ],
  );

  if (compileBinary.stdout) {
    console.log(compileBinary.stdout);
  }
  if (compileBinary.stderr) {
    console.log(compileBinary.stderr);
  }
}
