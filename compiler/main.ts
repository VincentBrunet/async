import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import { getConfig } from "./command/getConfig.ts";
import { convertCodeToTokens } from "./passes/001_tokens_parse/convertCodeToTokens.ts";
import { convertTokensToAst } from "./passes/005_ast_parse/convertTokensToAst.ts";
import { applyBinaryPrioritize } from "./passes/103_binary_prioritize/applyBinaryPrioritize.ts";
import { applyClosureResolve } from "./passes/104_closure_resolve/applyClosureResolve.ts";
import { applyReferenceResolve } from "./passes/105_reference_resolve/applyReferenceResolve.ts";
import { applyShorthandResolve } from "./passes/106_shorthand_resolve/applyShorthandResolve.ts";
import { applyTypeInference1 } from "./passes/201_type_inference_1/applyTypeInference1.ts";
import { convertAstToOutputModule } from "./passes/950_write_output/convertAstToOutputModule.ts";
import { stringify } from "./util/debug/stringify.ts";

const files = (await getConfig()).files;

//console.log("first", files[0]);

const firstCode = await Deno.readTextFile(files[0]);

ensureDir(files[0] + ".compiled");

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

applyBinaryPrioritize(firstAst);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.103.json",
  stringify(firstAst),
);

applyClosureResolve(firstAst);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.104.json",
  stringify(firstAst),
);

applyReferenceResolve(firstAst);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.105.json",
  stringify(firstAst),
);

applyShorthandResolve(firstAst);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.106.json",
  stringify(firstAst),
);

applyTypeInference1(firstAst);

Deno.writeTextFileSync(
  files[0] + ".compiled/pass.201.json",
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
