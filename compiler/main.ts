import { getConfig } from "./wrappers/getConfig.ts";

import { stringify } from "./utils/stringify.ts";

import { convertCodeToTokens } from "./passes/001_tokens/convertCodeToTokens.ts";
import { convertTokensToAst } from "./passes/101_ast/convertTokensToAst.ts";
import { convertAstToOutputCode } from "./passes/950_output/convertAstToOutputCode.ts";

const files = (await getConfig()).files;

console.log("first", files[0]);

const firstCode = await Deno.readTextFile(files[0]);

console.log("firstCode", firstCode);

const firstTokens = convertCodeToTokens(firstCode);

console.log("firstTokens", stringify(firstTokens));

const firstAst = convertTokensToAst(firstTokens);

console.log("firstAst", stringify(firstAst));

const firstOutputCode = convertAstToOutputCode(firstAst);

console.log("firstOutputCode", stringify(firstOutputCode));

Deno.writeTextFile(files[0] + ".compiled.h", firstOutputCode.getHeader());
Deno.writeTextFile(files[0] + ".compiled.c", firstOutputCode.getSource());
