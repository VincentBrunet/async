export async function readToString(reader: Deno.Reader) {
  const readSize = 1000;
  const readArray = new Uint8Array(readSize);
  const arrays = [];
  while (await reader.read(readArray)) {
    arrays.push(readArray.subarray());
  }
  let byteLength = 0;
  for (const array of arrays) {
    byteLength += array.byteLength;
  }
  let byteOffset = 0;
  const result = new Uint8Array(byteLength);
  for (const array of arrays) {
    result.set(array, byteOffset);
    byteOffset += array.byteLength;
  }
  return new TextDecoder().decode(result);
}
