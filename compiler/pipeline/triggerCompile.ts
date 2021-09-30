import { AstModule } from "../data/ast/AstModule.ts";
import { passUrlToCode } from "../passes/000_code_read/passUrlToCode.ts";
import { passCodeToToken } from "../passes/001_tokens_parse/passCodeToToken.ts";
import { passTokensToAst } from "../passes/005_ast_parse/passTokensToAst.ts";
import { passImportResolve } from "../passes/099_import_resolve/passImportResolve.ts";
import { passBinaryPrioritize } from "../passes/103_binary_prioritize/passBinaryPrioritize.ts";
import { passClosureResolve } from "../passes/104_closure_resolve/passClosureResolve.ts";
import { passReferenceResolve } from "../passes/105_reference_resolve/passReferenceResolve.ts";
import { passShorthandResolve } from "../passes/106_shorthand_resolve/passShorthandResolve.ts";
import { passStatementCollector } from "../passes/109_statement_collector/passStatementCollector.ts";
import { passTypeInferenceUpward } from "../passes/203_type_inference_upward/passTypeInferenceUpward.ts";
import { passAstToOutputModule } from "../passes/950_write_output/passAstToOutputModule.ts";
import { passOutputToObject } from "../passes/980_compile_output/passOutputToObject.ts";
import { doPass } from "./doPass.ts";

const compileQueue: AstModule[] = [];

export async function triggerCompile(url: URL) {
  const code = await passUrlToCode(url);

  const tokens = await doPass(code.cache, code, "001", passCodeToToken);
  const ast = await doPass(code.cache, tokens, "005", passTokensToAst);

  await doPass(code.cache, ast, "099", passImportResolve);

  compileQueue.push(ast);

  return ast;
}

export async function finishCompiles() {
  for (const compileItem of compileQueue) {
    await finishCompile(compileItem);
  }
}

export async function finishCompile(ast: AstModule) {
  const dir = ast.meta.meta.cache;

  await doPass(dir, ast, "103", passBinaryPrioritize);
  await doPass(dir, ast, "104", passClosureResolve);
  await doPass(dir, ast, "105", passReferenceResolve);
  await doPass(dir, ast, "106", passShorthandResolve);
  await doPass(dir, ast, "109", passStatementCollector);

  await doPass(dir, ast, "203", passTypeInferenceUpward);

  const output = await doPass(dir, ast, "950", passAstToOutputModule);
  const object = await doPass(dir, output, "980", passOutputToObject);
}
