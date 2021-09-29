import { stringify } from "../lib/core/debug/stringify.ts";

export async function doPass<Input, Output>(
  dir: string,
  input: Input,
  key: string,
  call: (input: Input) => Promise<Output>,
) {
  const output = await call(input);
  if (output) {
    await Deno.writeTextFile(
      dir + "/pass." + key + "." + call.name +
        ".json",
      stringify(output, new Set(["token", "tokens", "location"])),
    );
  } else {
    await Deno.writeTextFile(
      dir + "/pass." + key + "." + call.name +
        ".json",
      stringify(input, new Set(["token", "tokens", "location"])),
    );
  }
  return output;
}
