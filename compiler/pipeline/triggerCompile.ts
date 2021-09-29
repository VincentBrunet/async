import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import { AstModule } from "../data/ast/AstModule.ts";
import { hashModuleKey } from "../lib/hash/hashModuleKey.ts";
import { passUrlToCode } from "../passes/000_code_read/passUrlToCode.ts";
import { passCodeToTokens } from "../passes/001_tokens_parse/passCodeToTokens.ts";
import { passTokensToAst } from "../passes/005_ast_parse/passTokensToAst.ts";
import { passBinaryPrioritize } from "../passes/103_binary_prioritize/passBinaryPrioritize.ts";
import { passClosureResolve } from "../passes/104_closure_resolve/passClosureResolve.ts";
import { passReferenceResolve } from "../passes/105_reference_resolve/passReferenceResolve.ts";
import { passShorthandResolve } from "../passes/106_shorthand_resolve/passShorthandResolve.ts";
import { passStatementCollector } from "../passes/109_statement_collector/passStatementCollector.ts";
import { passImportResolve } from "../passes/199_import_resolve/passImportResolve.ts";
import { passTypeInferenceUpward } from "../passes/203_type_inference_upward/passTypeInferenceUpward.ts";
import { passAstToOutputModule } from "../passes/950_write_output/passAstToOutputModule.ts";
import { doPass } from "./doPass.ts";
import { readToString } from "./readToString.ts";

const cachePath = ".cache";

const compileQueue: AstModule[] = [];

async function dirFromHash(hash: string) {
  const dir = cachePath + "/" + hash;
  await ensureDir(dir);
  return dir;
}

export async function triggerCompile(url: string) {
  const code = await passUrlToCode(url);

  const hash = hashModuleKey(code);
  const dir = await dirFromHash(hash);

  const tokens = await doPass(dir, code, "001", passCodeToTokens);
  const ast = await doPass(dir, tokens, "005", passTokensToAst);

  await doPass(dir, ast, "103", passBinaryPrioritize);
  await doPass(dir, ast, "104", passClosureResolve);
  await doPass(dir, ast, "105", passReferenceResolve);
  await doPass(dir, ast, "106", passShorthandResolve);
  await doPass(dir, ast, "109", passStatementCollector);
  await doPass(dir, ast, "199", passImportResolve);

  compileQueue.push(ast);

  return ast;
}

export async function finishCompiles() {
  for (const compileItem of compileQueue) {
    await finishCompile(compileItem);
  }
}

export async function finishCompile(ast: AstModule) {
  const dir = await dirFromHash(ast.hash);

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

  const process = await Deno.run({
    cmd: ["cc", dir + "/output.c"],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });

  const status = await process.status();
  const stdout = await readToString(process.stdout);
  const stderr = await readToString(process.stderr);

  console.log("process.status", status);
  console.log("process.stderr", stderr);
  console.log("process.stdout", stdout);
}
