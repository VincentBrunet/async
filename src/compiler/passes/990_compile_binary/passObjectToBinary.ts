import { expandGlob } from 'https://deno.land/std@0.63.0/fs/mod.ts';
import { UnitModule } from '../../data/unit/UnitModule.ts';
import { ensure } from '../../passes/errors/ensure.ts';
import { cacheFileFromHash } from '../../lib/io/cacheFileFromHash.ts';
import { compileCommand } from '../../lib/io/compileCommand.ts';
import { join } from 'https://deno.land/std@0.63.0/path/mod.ts';

const runtimePath = join(Deno.cwd(), './src/runtime');

const stdlibs = new Array<string>();
for await (const file of expandGlob(join(runtimePath, '/**/*.cpp'))) {
  stdlibs.push(file.path);
}

export async function passObjectToBinary(
  unit: UnitModule,
  units: Array<UnitModule>,
) {
  const hash = unit.ast.hash;

  const mainPath = await Deno.makeTempFile({
    suffix: '.cpp',
  });

  const mainContent = new Array<string>();
  mainContent.push('#include "runtime.hpp"\n');
  mainContent.push('\n');
  mainContent.push('#include');
  mainContent.push(' ');
  mainContent.push('"');
  mainContent.push(cacheFileFromHash(hash, 'output.hpp'));
  mainContent.push('"');
  mainContent.push('\n');
  mainContent.push('\n');
  mainContent.push('void *(*ac::entry_module)() = (void *(*)())');
  mainContent.push(ensure(unit.ast.symbolGlobalGetterFunction));
  mainContent.push(';');
  mainContent.push('\n');

  await Deno.writeTextFile(
    mainPath,
    mainContent.join(''),
  );

  const compileBinary = await compileCommand([
    '-Wall',
    '-Wpedantic',
    '-std=c++11',
    '-lstdc++',
    '-I',
    runtimePath,
    ...units.map((unit) => (ensure(unit.files, unit.toString()).object)),
    mainPath,
    ...stdlibs.map((stdlib) => (stdlib)),
  ]);

  if (compileBinary.stdout) {
    console.log(compileBinary.stdout);
  }
  if (compileBinary.stderr) {
    console.log(compileBinary.stderr);
  }
}
