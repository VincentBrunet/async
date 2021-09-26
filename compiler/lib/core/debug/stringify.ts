import { repeat } from "../strings/repeat.ts";

function contentJoin(values: Array<string>, ident: number) {
  if (values.length <= 0) {
    return "";
  }
  const minimal = values.join(", ");
  if (minimal.length <= 64) {
    return " " + minimal + " ";
  }
  const pad0 = repeat(" ", ident);
  const pad1 = repeat(" ", ident + 1);
  return "\n" + pad1 + values.join(",\n" + pad1) + "\n" + pad0;
}

export function stringify(
  v: any,
  no?: Set<string>,
  id?: number,
  br?: Set<any>,
  cr?: number,
): string {
  const ident = id ?? 0;

  if (v === undefined) {
    return "undefined";
  }
  if (v === null) {
    return "null";
  }

  const type = typeof v;
  if (type === "boolean") {
    return v ? "true" : "false";
  }
  if (type === "number") {
    return v.toString();
  }
  if (type === "string") {
    return '"' + v.replace(/[\n]/g, "\n") + '"';
  }

  const browsed = br ?? new Set();
  let circulars = cr ?? 0;

  if (browsed.has(v)) {
    circulars++;
  }
  browsed.add(v);

  if (circulars > 2) {
    return "{/* circular */}";
  }

  if (Array.isArray(v)) {
    const content = v.map((item) => {
      return stringify(item, no, ident + 1, browsed, circulars);
    });
    return "[" + contentJoin(content, ident) + "]";
  }

  if (v instanceof Map) {
    const keys = [...v.keys()].filter((key) => {
      return !no?.has(key);
    });
    const content = keys.map((key) => {
      return key + ": " +
        stringify(v.get(key), no, ident + 1, browsed, circulars);
    });
    return "Map<{" + contentJoin(content, ident) + "}>";
  }

  if (type === "object") {
    const keys = Object.keys(v).filter((key) => {
      return !no?.has(key);
    });
    const content = keys.map((key) => {
      return '"' + key + '"' + ": " +
        stringify(v[key], no, ident + 1, browsed, circulars);
    });
    return "{" + contentJoin(content, ident) + "}";
  }

  return v.toString();
}
