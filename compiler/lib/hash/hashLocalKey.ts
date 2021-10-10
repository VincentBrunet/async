export function hashLocalKey(
  prefix: string,
  name: string,
) {
  return ["_", prefix, "_", name].join("");
}
