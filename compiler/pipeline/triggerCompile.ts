import { AstModule } from "../data/ast/AstModule.ts";
import { passUrlToCode } from "../passes/000_code_read/passUrlToCode.ts";
import { passCodeToToken } from "../passes/001_tokens_parse/passCodeToToken.ts";
import { passTokenToAst } from "../passes/005_ast_parse/passTokenToAst.ts";
import { passImportResolve } from "../passes/099_import_resolve/passImportResolve.ts";
import { passParentRef } from "../passes/102_parent_ref/passParentRef.ts";
import { passBinaryPrioritize } from "../passes/103_binary_prioritize/passBinaryPrioritize.ts";
import { passClosureResolve } from "../passes/104_closure_resolve/passClosureResolve.ts";
import { passReferenceResolve } from "../passes/105_reference_resolve/passReferenceResolve.ts";
import { passShorthandResolve } from "../passes/106_shorthand_resolve/passShorthandResolve.ts";
import { passStatementCollector } from "../passes/109_statement_collector/passStatementCollector.ts";
import { passTypeInferenceUpward } from "../passes/203_type_inference_upward/passTypeInferenceUpward.ts";
import { passAstToOutput } from "../passes/950_write_output/passAstToOutput.ts";
import { passOutputToObject } from "../passes/980_compile_output/passOutputToObject.ts";
import { passObjectToBinary } from "../passes/990_compile_binary/passObjectToBinary.ts";
import { doPass } from "./doPass.ts";

const compileQueue: AstModule[] = [];

export async function triggerCompile(url: URL) {
  const code = await passUrlToCode(url);

  const token = await doPass(code.cache, code, "001", passCodeToToken);
  const ast = await doPass(code.cache, token, "005", passTokenToAst);

  await doPass(code.cache, ast, "099", passImportResolve);

  compileQueue.push(ast);

  return ast;
}

export async function finishCompiles(module: AstModule) {
  const objects = [];
  for (const compileItem of compileQueue) {
    objects.push(await finishCompile(compileItem));
  }
  await passObjectToBinary(module, objects);
}

export async function finishCompile(ast: AstModule) {
  const dir = ast.metaCode.cache;

  await doPass(dir, ast, "102", passParentRef);
  await doPass(dir, ast, "103", passBinaryPrioritize);
  await doPass(dir, ast, "104", passClosureResolve);
  await doPass(dir, ast, "105", passReferenceResolve);
  await doPass(dir, ast, "106", passShorthandResolve);
  await doPass(dir, ast, "109", passStatementCollector);

  await doPass(dir, ast, "203", passTypeInferenceUpward);

  const output = await doPass(dir, ast, "950", passAstToOutput);
  const object = await doPass(dir, output, "980", passOutputToObject);

  return object;
}
