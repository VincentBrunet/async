import { ensureDirSync } from "https://deno.land/std/fs/ensure_dir.ts";
import { stringify } from "./lib/core/debug/stringify.ts";
import { convertCodeToTokens } from "./passes/001_tokens_parse/convertCodeToTokens.ts";
import { convertTokensToAst } from "./passes/005_ast_parse/convertTokensToAst.ts";
import { applyBinaryPrioritize } from "./passes/103_binary_prioritize/applyBinaryPrioritize.ts";
import { applyClosureResolve } from "./passes/104_closure_resolve/applyClosureResolve.ts";
import { applyReferenceResolve } from "./passes/105_reference_resolve/applyReferenceResolve.ts";
import { applyShorthandResolve } from "./passes/106_shorthand_resolve/applyShorthandResolve.ts";
import { applyStatementCollector } from "./passes/109_statement_collector/applyStatementCollector.ts";
import { applyTypeInferenceUpward } from "./passes/203_type_inference_upward/applyTypeInferenceUpward.ts";
import { convertAstToOutputModule } from "./passes/950_write_output/convertAstToOutputModule.ts";

const files = Deno.args; // todo

const firstCode = await Deno.readTextFile(files[0]);

const firstOutputDirectory = files[0] + ".compiled";

ensureDirSync(firstOutputDirectory);

const firstTokens = convertCodeToTokens(firstCode);

Deno.writeTextFileSync(
  firstOutputDirectory + "/pass.001.convertCodeToTokens.json",
  stringify(firstTokens, new Set(["location"])),
);

const firstAst = convertTokensToAst(firstTokens);

Deno.writeTextFileSync(
  firstOutputDirectory + "/pass.005.convertTokensToAst.json",
  stringify(firstAst, new Set(["token"])),
);

const passes = [
  { key: "103", apply: applyBinaryPrioritize },
  { key: "104", apply: applyClosureResolve },
  { key: "105", apply: applyReferenceResolve },
  { key: "106", apply: applyShorthandResolve },
  { key: "109", apply: applyStatementCollector },
  { key: "203", apply: applyTypeInferenceUpward },
];

for (const pass of passes) {
  pass.apply(firstAst);
  Deno.writeTextFileSync(
    firstOutputDirectory + "/pass." + pass.key + "." + pass.apply.name +
      ".json",
    stringify(firstAst, new Set(["token"])),
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
