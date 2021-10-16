import { AstModule } from "../data/ast/AstModule.ts";
import { passUrlToCode } from "../passes/000_code_read/passUrlToCode.ts";
import { passCodeToToken } from "../passes/001_token_parse/passCodeToToken.ts";
import { passTokenToAst } from "../passes/005_ast_parse/passTokenToAst.ts";
import { passImportResolve } from "../passes/099_import_resolve/passImportResolve.ts";
import { passParentRef } from "../passes/102_parent_ref/passParentRef.ts";
import { passBinaryPrioritize } from "../passes/103_binary_prioritize/passBinaryPrioritize.ts";
import { passClosureResolve } from "../passes/104_closure_resolve/passClosureResolve.ts";
import { passReferenceResolve } from "../passes/105_reference_resolve/passReferenceResolve.ts";
import { passShorthandResolve } from "../passes/106_shorthand_resolve/passShorthandResolve.ts";
import { passStatementCollector } from "../passes/109_statement_collector/passStatementCollector.ts";
import { passTypeInferenceUpward } from "../passes/203_type_inference_upward/passTypeInferenceUpward.ts";
import { passAstToOutput } from "../passes/950_output_generate/passAstToOutput.ts";
import { passOutputToFile } from "../passes/960_output_write/passOutputToFile.ts";
import { passFileToObject } from "../passes/980_compile_output/passFileToObject.ts";
import { passObjectToBinary } from "../passes/990_compile_binary/passObjectToBinary.ts";

export async function doPass<Input, Output>(
  dir: string,
  input: Input,
  key: string,
  call: (input: Input) => Promise<Output>,
) {
  const output = await call(input);
  /*
  if (output) {
    await Deno.writeTextFile(
      dir + "/pass." + key + "." + call.name +
        ".json",
      stringify(output, new Set(["token", "tokens", "location"])),
    );
  } else {
    await Deno.writeTextFile(
      dir + "/pass." + key + "." + call.name +
        ".json",
      stringify(input, new Set(["token", "tokens", "location"])),
    );
  }
  */
  return output;
}

const compileQueue: AstModule[] = [];

export async function triggerCompile(url: URL) {
  const code = await passUrlToCode(url);

  const hash = code.hash;

  const token = await doPass(hash, code, "001", passCodeToToken);
  const ast = await doPass(hash, token, "005", passTokenToAst);

  await doPass(hash, ast, "099", passImportResolve);

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
  const hash = ast.sourceToken.sourceCode.hash;

  await doPass(hash, ast, "102", passParentRef);
  await doPass(hash, ast, "103", passBinaryPrioritize);
  await doPass(hash, ast, "104", passClosureResolve);
  await doPass(hash, ast, "105", passReferenceResolve);
  await doPass(hash, ast, "106", passShorthandResolve);
  await doPass(hash, ast, "109", passStatementCollector);

  await doPass(hash, ast, "203", passTypeInferenceUpward);

  const output = await doPass(hash, ast, "950", passAstToOutput);
  const file = await doPass(hash, output, "960", passOutputToFile);
  const object = await doPass(hash, file, "980", passFileToObject);

  return object;
}
