export function hashLocalSymbol(
  prefix: string,
  name: string,
) {
  return ["_", prefix, "_", name].join("");
}
