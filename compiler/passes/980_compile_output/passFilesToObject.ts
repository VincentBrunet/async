import { UnitModule } from "../../data/unit/UnitModule.ts";
import { ensure } from "../../lib/errors/ensure.ts";
import { compileCommand } from "../../lib/io/compileCommand.ts";

export async function passFilesToObject(unit: UnitModule) {
  const files = ensure(unit.files);
  const compileObject = await compileCommand(
    [
      "-Wall",
      "-Wpedantic",
      "-I",
      "stdlib",
      "-c",
      files.source,
      "-o",
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
