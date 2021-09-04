import { convertCodeToTokens } from "./passes/001_tokens/convertCodeToTokens.ts";
import { convertTokensToAst } from "./passes/101_ast/convertTokensToAst.ts";
import { convertAstToOutputModule } from "./passes/950_output/convertAstToOutputModule.ts";
import { stringify } from "./utils/stringify.ts";
import { getConfig } from "./wrappers/getConfig.ts";

const files = (await getConfig()).files;

console.log("first", files[0]);

const firstCode = await Deno.readTextFile(files[0]);

console.log("firstCode", firstCode);

const firstTokens = convertCodeToTokens(firstCode);

console.log("firstTokens", stringify(firstTokens));

const firstAst = convertTokensToAst(firstTokens);

console.log("firstAst", stringify(firstAst));

const firstOutputModule = convertAstToOutputModule(firstAst);

console.log("firstOutputModule", stringify(firstOutputModule));

Deno.writeTextFile(
  files[0] + ".compiled.h",
  firstOutputModule.generateHeader(),
);
Deno.writeTextFile(
  files[0] + ".compiled.c",
  firstOutputModule.generateSource(),
);
