import { CodeModule } from "../../data/code/CodeModule.ts";

/**
 * Resolvers
 */
interface Resolver {
  protocol: string;
  call: (url: URL) => Promise<string>;
}

const resolvers: Resolver[] = [];

resolvers.push({ protocol: "https:", call: readHttps });
resolvers.push({ protocol: "file:", call: readFile });

async function readHttps(url: URL) {
  const response = await fetch(url);
  return await response.text();
}

async function readFile(url: URL) {
  return await Deno.readTextFile(url);
}

/**
 * Find resolver and fetch code
 */
export async function passUrlToCode(url: URL): Promise<CodeModule> {
  for (const resolver of resolvers) {
    if (url.protocol === resolver.protocol) {
      return {
        content: await resolver.call(url),
      };
    }
  }
  throw new Error("Unknown URL content:" + url);
}
