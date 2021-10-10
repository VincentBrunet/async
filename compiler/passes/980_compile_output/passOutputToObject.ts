import { OutputModule } from "../950_write_output/util/OutputModule.ts";

async function readToString(reader: Deno.Reader) {
  const readSize = 1000;
  const readArray = new Uint8Array(readSize);
  const arrays = [];
  while (await reader.read(readArray)) {
    arrays.push(readArray.subarray());
  }
  let byteLength = 0;
  for (const array of arrays) {
    byteLength += array.byteLength;
  }
  let byteOffset = 0;
  const result = new Uint8Array(byteLength);
  for (const array of arrays) {
    result.set(array, byteOffset);
    byteOffset += array.byteLength;
  }
  return new TextDecoder().decode(result);
}

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

  const process = await Deno.run({
    cmd: [
      "cc",
      "-I",
      "stdlib",
      "-c",
      dir + "/output.c",
      "-o",
      dir + "/output.o",
    ],
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
