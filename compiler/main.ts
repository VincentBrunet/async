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

Deno.mkdirSync(files[0] + ".compiled");

const firstTokens = convertCodeToTokens(firstCode);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.001.json",
  stringify(firstTokens),
);

const firstAst = convertTokensToAst(firstTokens);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.005.json",
  stringify(firstAst),
);

applyAstBinaryPrioritize(firstAst);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.103.json",
  stringify(firstAst),
);

applyAstClosureResolve(firstAst);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.104.json",
  stringify(firstAst),
);

applyAstReferenceResolve(firstAst);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.105.json",
  stringify(firstAst),
);

applyAstShorthandResolve(firstAst);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.106.json",
  stringify(firstAst),
);

const firstOutputModule = convertAstToOutputModule(firstAst);

//console.log("firstOutputModule", stringify(firstOutputModule));

Deno.writeTextFileSync(
  files[0] + ".compiled/output.h",
  firstOutputModule.generateHeader(),
);
Deno.writeTextFileSync(
  files[0] + ".compiled/output.c",
  firstOutputModule.generateSource(),
);
