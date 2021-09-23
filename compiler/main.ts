import { getConfig } from "./command/getConfig.ts";
import { convertCodeToTokens } from "./passes/001_tokens_parse/convertCodeToTokens.ts";
import { convertTokensToAst } from "./passes/005_ast_parse/convertTokensToAst.ts";
import { applyAstBinaryPrioritize } from "./passes/103_binary_prioritize/applyAstBinaryPrioritize.ts";
import { applyAstClosureResolve } from "./passes/104_closure_resolve/applyAstClosureResolve.ts";
import { applyAstReferenceResolve } from "./passes/105_reference_resolve/applyAstReferenceResolve.ts";
import { applyAstShorthandResolve } from "./passes/106_shorthand_resolve/applyAstShorthandResolve.ts";
import { convertAstToOutputModule } from "./passes/950_write_output/convertAstToOutputModule.ts";
import { stringify } from "./util/debug/stringify.ts";

const files = (await getConfig()).files;

//console.log("first", files[0]);

const firstCode = await Deno.readTextFile(files[0]);

//console.log("firstCode", firstCode);

const firstTokens = convertCodeToTokens(firstCode);

//console.log("firstTokens", stringify(firstTokens));

const firstAst = convertTokensToAst(firstTokens);

//console.log("firstAst - 0", stringify(firstAst));

Deno.writeTextFile(
  files[0] + ".compiled.1.json",
  stringify(firstAst),
);

applyAstBinaryPrioritize(firstAst);

Deno.writeTextFile(
  files[0] + ".compiled.2.json",
  stringify(firstAst),
);

applyAstClosureResolve(firstAst);

Deno.writeTextFile(
  files[0] + ".compiled.3.json",
  stringify(firstAst),
);

applyAstReferenceResolve(firstAst);

Deno.writeTextFile(
  files[0] + ".compiled.4.json",
  stringify(firstAst),
);

applyAstShorthandResolve(firstAst);

Deno.writeTextFile(
  files[0] + ".compiled.5.json",
  stringify(firstAst),
);

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
