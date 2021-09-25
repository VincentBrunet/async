import { ensureDirSync } from "https://deno.land/std/fs/ensure_dir.ts";
import { getConfig } from "./command/getConfig.ts";
import { convertCodeToTokens } from "./passes/001_tokens_parse/convertCodeToTokens.ts";
import { convertTokensToAst } from "./passes/005_ast_parse/convertTokensToAst.ts";
import { applyBinaryPrioritize } from "./passes/103_binary_prioritize/applyBinaryPrioritize.ts";
import { applyClosureResolve } from "./passes/104_closure_resolve/applyClosureResolve.ts";
import { applyReferenceResolve } from "./passes/105_reference_resolve/applyReferenceResolve.ts";
import { applyShorthandResolve } from "./passes/106_shorthand_resolve/applyShorthandResolve.ts";
import { applyReturnResolve } from "./passes/109_returns_resolve/applyReturnResolve.ts";
import { convertAstToOutputModule } from "./passes/950_write_output/convertAstToOutputModule.ts";
import { stringify } from "./util/debug/stringify.ts";

const files = (await getConfig()).files;

const firstCode = await Deno.readTextFile(files[0]);

const firstOutputDirectory = files[0] + ".compiled";

ensureDirSync(firstOutputDirectory);

const firstTokens = convertCodeToTokens(firstCode);

Deno.writeTextFileSync(
  firstOutputDirectory + "/pass.001.json",
  stringify(firstTokens),
);

const firstAst = convertTokensToAst(firstTokens);

Deno.writeTextFileSync(
  firstOutputDirectory + "/pass.005.json",
  stringify(firstAst),
);

const passes = [
  { key: "103", apply: applyBinaryPrioritize },
  { key: "104", apply: applyClosureResolve },
  { key: "105", apply: applyReferenceResolve },
  { key: "106", apply: applyShorthandResolve },
  { key: "109", apply: applyReturnResolve },
  //{ key: "201", apply: applyTypeInference1 },
];

for (const pass of passes) {
  pass.apply(firstAst);
  Deno.writeTextFileSync(
    firstOutputDirectory + "/pass." + pass.key + ".json",
    stringify(firstAst),
  );
}

const firstOutputModule = convertAstToOutputModule(firstAst);

Deno.writeTextFileSync(
  firstOutputDirectory + "/output.h",
  firstOutputModule.generateHeader(),
);
Deno.writeTextFileSync(
  firstOutputDirectory + "/output.c",
  firstOutputModule.generateSource(),
);
