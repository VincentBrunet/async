import { UnitModule } from '../../data/unit/UnitModule.ts';
import { ensure } from '../../passes/errors/ensure.ts';
import { compileCommand } from '../../lib/io/compileCommand.ts';
import { join } from 'https://deno.land/std@0.63.0/path/mod.ts';

const runtimePath = join(Deno.cwd(), './src/runtime');

export async function passFilesToObject(unit: UnitModule) {
  const files = ensure(unit.files);
  const compileObject = await compileCommand(
    [
      '-Wall',
      '-Wpedantic',
      '-S',
      '-I',
      runtimePath,
      files.source,
      '-o',
      files.object,
    ],
  );
  if (compileObject.stdout) {
    console.log(compileObject.stdout);
  }
  if (compileObject.stderr) {
    console.log(compileObject.stderr);
  }
}
