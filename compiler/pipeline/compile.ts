import { AstModule } from "../data/ast/AstModule.ts";
import { passUrlToCode } from "../passes/000_code_read/passUrlToCode.ts";
import { passCodeToToken } from "../passes/001_token_parse/passCodeToToken.ts";
import { passTokenToAst } from "../passes/005_ast_parse/passTokenToAst.ts";
import { passImportResolve } from "../passes/099_import_resolve/passImportResolve.ts";
import { passExportRead } from "../passes/101_export_read/passExportRead.ts";
import { passBinaryPrioritize } from "../passes/113_binary_prioritize/passBinaryPrioritize.ts";
import { passClosureResolve } from "../passes/123_closure_resolve/passClosureResolve.ts";
import { passReferenceResolve } from "../passes/125_reference_resolve/passReferenceResolve.ts";
import { passStatementCollector } from "../passes/103_statement_collector/passStatementCollector.ts";
import { passTypeInferenceUpward } from "../passes/203_type_inference_upward/passTypeInferenceUpward.ts";
import { passAstToOutput } from "../passes/950_output_generate/passAstToOutput.ts";
import { passOutputToFile } from "../passes/960_output_write/passOutputToFile.ts";
import { passFileToObject } from "../passes/980_compile_output/passFileToObject.ts";
import { passObjectToBinary } from "../passes/990_compile_binary/passObjectToBinary.ts";
import { passImportLink } from "../passes/106_import_link/passImportLink.ts";

export async function compileUrlToAst(url: URL): Promise<AstModule> {
  const code = await passUrlToCode(url);
  const token = passCodeToToken(code);
  const ast = passTokenToAst(token);
  /* 099 */ passImportResolve(ast);
  return ast;
}

const compileAstPasses: ((ast: AstModule) => void)[] = [
  /* 101 */ passExportRead,
  /* 103 */ passStatementCollector,
  /* 106 */ passImportLink,
  /* 113 */ passBinaryPrioritize,
  /* 123 */ passClosureResolve,
  /* 125 */ passReferenceResolve,
  /* 203 */ passTypeInferenceUpward,
];

export async function compileAstToObject(ast: AstModule): Promise<string> {
  const output = passAstToOutput(ast);
  const file = await passOutputToFile(output);
  const object = await passFileToObject(file);
  return object;
}

interface ScheduledImport {
  url: URL;
  completion: (ast: AstModule) => void;
}

interface ScheduledCompile {
  ast: AstModule;
}

const scheduledImports = new Array<ScheduledImport>();
const scheduledCompiles = new Array<ScheduledCompile>();

export function scheduleImport(url: URL, completion: (ast: AstModule) => void) {
  scheduledImports.push({
    url: url,
    completion: completion,
  });
}

export async function runLoop() {
  while (scheduledImports.length > 0) {
    const scheduledImport = scheduledImports.shift();
    if (scheduledImport) {
      const ast = await compileUrlToAst(scheduledImport.url);
      scheduledImport.completion(ast);
      scheduledCompiles.push({ ast: ast });
    }
  }

  for (const compileAstPass of compileAstPasses) {
    for (const scheduledCompile of scheduledCompiles) {
      compileAstPass(scheduledCompile.ast);
    }
  }

  const main = scheduledCompiles[0].ast;

  const objects: Array<string> = [];
  for (const scheduledCompile of scheduledCompiles) {
    objects.push(await compileAstToObject(scheduledCompile.ast));
  }
  await passObjectToBinary(main, objects);
}
