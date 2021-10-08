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
  value: any,
  ignoreKeys?: Set<string>,
): string {
  return stringifyInner(value, ignoreKeys ?? new Set(), 0, new Set(), 0);
}

function stringifyInner(
  value: any,
  ignoreKeys: Set<string>,
  indentation: number,
  alreadyBrowsed: Set<any>,
  circularStage: number,
): string {
  if (value === undefined) {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }

  const type = typeof value;
  if (type === "boolean") {
    return value ? "true" : "false";
  }
  if (type === "number") {
    return value.toString();
  }
  if (type === "string") {
    return '"' + value
      .replace(/[\n]/g, "\\n")
      .replace(/[\\]/g, "\\\\")
      .replace(/[\"]/g, '\\"') +
      '"';
  }

  if (alreadyBrowsed.has(value)) {
    circularStage++;
  }
  alreadyBrowsed.add(value);

  if (circularStage > 2) {
    return "{/* circular */}";
  }

  if (Array.isArray(value)) {
    const content = value.map((item) => {
      return stringifyInner(
        item,
        ignoreKeys,
        indentation + 1,
        alreadyBrowsed,
        circularStage,
      );
    });
    return "[" + contentJoin(content, indentation) + "]";
  }

  if (value instanceof Map) {
    const keys = [...value.keys()].filter((key) => {
      return !ignoreKeys.has(key);
    });
    const content = keys.map((key) => {
      return key + ": " +
        stringifyInner(
          value.get(key),
          ignoreKeys,
          indentation + 1,
          alreadyBrowsed,
          circularStage,
        );
    });
    return "Map<{" + contentJoin(content, indentation) + "}>";
  }

  if (type === "object") {
    const keys = Object.keys(value).filter((key) => {
      return !ignoreKeys.has(key);
    });
    const content = keys.map((key) => {
      return '"' + key + '"' + ": " +
        stringifyInner(
          value[key],
          ignoreKeys,
          indentation + 1,
          alreadyBrowsed,
          circularStage,
        );
    });
    return "{" + contentJoin(content, indentation) + "}";
  }

  return value.toString();
}
