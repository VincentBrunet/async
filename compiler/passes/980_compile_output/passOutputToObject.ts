import { cacheDirFromHash } from "../../lib/fs/cacheDirFromHash.ts";
import { OutputModule } from "../950_write_output/util/OutputModule.ts";
import { readToString } from "./util/readToString.ts";

export async function passOutputToObject(output: OutputModule) {
  const dir = await cacheDirFromHash(output.getHash());

  Deno.writeTextFileSync(
    dir + "/output.h",
    output.generateHeader(),
  );
  Deno.writeTextFileSync(
    dir + "/output.c",
    output.generateSource(),
  );

  const process = await Deno.run({
    cmd: ["cc", dir + "/output.c"],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });

  const status = await process.status();
  const stdout = await readToString(process.stdout);
  const stderr = await readToString(process.stderr);

  console.log("process.status", status);
  console.log("process.stderr", stderr);
  console.log("process.stdout", stdout);
}
