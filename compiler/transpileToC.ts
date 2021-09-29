import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import { stringify } from "./lib/core/debug/stringify.ts";
import { hashModuleKey } from "./lib/hash/hashModuleKey.ts";
import { passUrlToCode } from "./passes/000_code_read/passUrlToCode.ts";
import { passCodeToTokens } from "./passes/001_tokens_parse/passCodeToTokens.ts";
import { passTokensToAst } from "./passes/005_ast_parse/passTokensToAst.ts";
import { passBinaryPrioritize } from "./passes/103_binary_prioritize/passBinaryPrioritize.ts";
import { passClosureResolve } from "./passes/104_closure_resolve/passClosureResolve.ts";
import { passReferenceResolve } from "./passes/105_reference_resolve/passReferenceResolve.ts";
import { passShorthandResolve } from "./passes/106_shorthand_resolve/passShorthandResolve.ts";
import { passStatementCollector } from "./passes/109_statement_collector/passStatementCollector.ts";
import { passTypeInferenceUpward } from "./passes/203_type_inference_upward/passTypeInferenceUpward.ts";
import { passAstToOutputModule } from "./passes/950_write_output/passAstToOutputModule.ts";

const cachePath = "~/Workspace/Vincent/async/.cache";

async function doPass<Input, Output>(
  dir: string,
  input: Input,
  key: string,
  call: (input: Input) => Promise<Output>,
) {
  const output = await call(input);
  await Deno.writeTextFile(
    dir + "/pass." + key + "." + call.name +
      ".json",
    stringify(key, new Set(["token", "location"])),
  );
  return output;
}

export async function transpileToC(url: string) {
  const code = await passUrlToCode(url);

  const hash = hashModuleKey(code);
  const dir = cachePath + "/" + hash;

  await ensureDir(dir);

  const tokens = await doPass(dir, code, "001", passCodeToTokens);
  const ast = await doPass(dir, tokens, "005", passTokensToAst);

  await doPass(dir, ast, "103", passBinaryPrioritize);
  await doPass(dir, ast, "104", passClosureResolve);
  await doPass(dir, ast, "105", passReferenceResolve);
  await doPass(dir, ast, "106", passShorthandResolve);
  await doPass(dir, ast, "109", passStatementCollector);
  await doPass(dir, ast, "203", passTypeInferenceUpward);

  const output = await doPass(dir, ast, "950", passAstToOutputModule);

  Deno.writeTextFileSync(
    dir + "/output.h",
    output.generateHeader(),
  );
  Deno.writeTextFileSync(
    dir + "/output.c",
    output.generateSource(),
  );
}
