import { getConfig } from "./wrappers/getConfig.ts";

import { stringify } from "./utils/stringify.ts";

import { convertCodeToTokens } from "./passes/001_tokens/convertCodeToTokens.ts";
import { convertTokensToAst } from "./passes/002_ast/convertTokensToAst.ts";

const files = (await getConfig()).files;

//const firstUrl = new URL(files[0])

console.log("first", files[0]);
//console.log("firstUrl", firstUrl);

const firstCode = await Deno.readTextFile(files[0]);

console.log("firstCode", firstCode);

const firstTokens = convertCodeToTokens(firstCode);

console.log("firstTokens", stringify(firstTokens));

const firstAst = convertTokensToAst(firstTokens);

console.log("firstAst", stringify(firstAst));
