interface Resolver {
  protocol: string;
  call: (url: string) => Promise<string>;
}

const resolvers: Resolver[] = [];
resolvers.push({ protocol: "http", call: readHttp });
resolvers.push({ protocol: "https", call: readHttp });
resolvers.push({ protocol: "file", call: readFile });
resolvers.push({ protocol: "", call: readFile });

async function readHttp(url: string) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

async function readFile(url: string) {
  return await Deno.readTextFile(url);
}

export async function passUrlToCode(
  url: string,
) {
  for (const resolver of resolvers) {
    if (url.startsWith(resolver.protocol)) {
      return resolver.call(url);
    }
  }
  throw new Error("Unknown URL content:" + url);
}
