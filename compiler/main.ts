import { convertCodeToTokens } from "./passes/001_build_tokens/convertCodeToTokens.ts";
import { convertTokensToAst } from "./passes/005_build_ast/convertTokensToAst.ts";
import { applyAstIdentifierResolve } from "./passes/105_identifier_resolve/applyAstIdentifierResolve.ts";
import { convertAstToOutputModule } from "./passes/950_output/convertAstToOutputModule.ts";
import { stringify } from "./util/stringify.ts";
import { getConfig } from "./wrappers/getConfig.ts";

const files = (await getConfig()).files;

//console.log("first", files[0]);

const firstCode = await Deno.readTextFile(files[0]);

//console.log("firstCode", firstCode);

const firstTokens = convertCodeToTokens(firstCode);

//console.log("firstTokens", stringify(firstTokens));

const firstAst = convertTokensToAst(firstTokens);

//console.log("firstAst - 0", stringify(firstAst));

applyAstIdentifierResolve(firstAst);

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
