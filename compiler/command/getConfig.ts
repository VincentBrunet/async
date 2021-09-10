export function getConfig() {
  return Promise.resolve({
    files: Deno.args,
  });
}
