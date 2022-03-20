export function assert<T>(required: boolean) {
  if (!required) {
    throw Error('Assert failed');
  }
}
