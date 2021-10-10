import { compileCommand } from "../../lib/io/compileCommand.ts";
import { OutputModule } from "../950_write_output/util/OutputModule.ts";

export async function passOutputToObject(output: OutputModule) {
  const dir = output.getMeta().meta.meta.cache;

  Deno.writeTextFileSync(
    dir + "/output.h",
    output.generateHeader(),
  );
  Deno.writeTextFileSync(
    dir + "/output.c",
    output.generateSource(),
  );

  const compileObject = await compileCommand(
    [
      "-Wall",
      "-Wpedantic",
      "-I",
      "stdlib",
      "-c",
      dir + "/output.c",
      "-o",
      dir + "/output.o",
    ],
  );

  if (compileObject.stdout) {
    console.log(compileObject.stdout);
  }
  if (compileObject.stderr) {
    console.log(compileObject.stderr);
  }

  return dir + "/output.o";
}
