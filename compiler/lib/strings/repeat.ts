export function repeat(value: string, times: number) {
  const parts = new Array<string>();
  for (let i = 0; i < times; i++) {
    parts.push(value);
  }
  return parts.join("");
}
