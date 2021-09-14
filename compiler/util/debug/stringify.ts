import { repeat } from "../strings/repeat.ts";

function contentJoin(values: Array<string>, ident: number) {
  if (values.length <= 0) {
    return "";
  }
  const minimal = values.join(" ");
  if (minimal.length <= 64) {
    return " " + minimal + " ";
  }
  const pad0 = repeat(" ", ident);
  const pad1 = repeat(" ", ident + 1);
  return "\n" + pad1 + values.join("\n" + pad1) + "\n" + pad0;
}

export function stringify(v: any, id?: number): string {
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

  if (Array.isArray(v)) {
    const content = v.map((item) => {
      return stringify(item, ident + 1) + ",";
    });
    return "[" + contentJoin(content, ident) + "]";
  }

  if (v instanceof Map) {
    const keys = [...v.keys()];
    const content = keys.map((key) => {
      return key + ": " + stringify(v.get(key), ident + 1) + ",";
    });
    return "Map<{" + contentJoin(content, ident) + "}>";
  }

  if (type === "object") {
    const keys = Object.keys(v);
    const content = keys.map((key) => {
      return key + ": " + stringify(v[key], ident + 1) + ",";
    });
    return "{" + contentJoin(content, ident) + "}";
  }

  return v.toString();
}
