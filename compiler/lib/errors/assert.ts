export function assert<T>(required?: T) {
  if (required === undefined) {
    throw Error("Assert");
  }
}
