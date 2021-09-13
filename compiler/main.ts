import { getConfig } from "./command/getConfig.ts";
import { convertCodeToTokens } from "./passes/001_tokens_parse/convertCodeToTokens.ts";
import { convertTokensToAst } from "./passes/005_ast_parse/convertTokensToAst.ts";
import { applyAstBinaryPrioritize } from "./passes/103_binary_prioritize/applyAstBinaryPrioritize.ts";
import { applyAstClosureResolve } from "./passes/104_closure_resolve/applyAstClosureResolve.ts";
import { applyAstReferenceResolve } from "./passes/105_reference_resolve/applyAstReferenceResolve.ts";
import { convertAstToOutputModule } from "./passes/950_output/convertAstToOutputModule.ts";
import { stringify } from "./util/stringify.ts";

const files = (await getConfig()).files;

//console.log("first", files[0]);

const firstCode = await Deno.readTextFile(files[0]);

//console.log("firstCode", firstCode);

const firstTokens = convertCodeToTokens(firstCode);

//console.log("firstTokens", stringify(firstTokens));

const firstAst = convertTokensToAst(firstTokens);

console.log("firstAst - 0", stringify(firstAst));

applyAstBinaryPrioritize(firstAst);
applyAstClosureResolve(firstAst);
applyAstReferenceResolve(firstAst);

//console.log("firstAst - 1", stringify(firstAst));

const firstOutputModule = convertAstToOutputModule(firstAst);

//console.log("firstOutputModule", stringify(firstOutputModule));

Deno.writeTextFile(
  files[0] + ".compiled.h",
  firstOutputModule.generateHeader(),
);
Deno.writeTextFile(
  files[0] + ".compiled.c",
  firstOutputModule.generateSource(),
);
