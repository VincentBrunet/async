import { AstModule } from "../data/ast/AstModule.ts";
import { passUrlToCode } from "../passes/000_code_read/passUrlToCode.ts";
import { passCodeToToken } from "../passes/001_token_parse/passCodeToToken.ts";
import { passTokenToAst } from "../passes/005_ast_parse/passTokenToAst.ts";
import { passImportSchedule } from "../passes/099_import_schedule/passImportSchedule.ts";
import { passExportRead } from "../passes/101_export_read/passExportRead.ts";
import { passBinaryPrioritize } from "../passes/113_binary_prioritize/passBinaryPrioritize.ts";
import { passClosureResolve } from "../passes/123_closure_resolve/passClosureResolve.ts";
import { passReferenceResolve } from "../passes/125_reference_resolve/passReferenceResolve.ts";
import { passStatementCollector } from "../passes/103_statement_collector/passStatementCollector.ts";
import { passTypeInferenceUpward } from "../passes/203_type_inference_upward/passTypeInferenceUpward.ts";
import { passAstToOutput } from "../passes/950_output_generate/passAstToOutput.ts";
import { passObjectToBinary } from "../passes/990_compile_binary/passObjectToBinary.ts";
import { passImportLink } from "../passes/106_import_link/passImportLink.ts";
import { UnitModule } from "../data/unit/UnitModule.ts";
import { hashModuleId } from "../lib/hash/hashModuleId.ts";
import { passOutputToFiles } from "../passes/960_output_write/passOutputToFiles.ts";
import { passFilesToObject } from "../passes/980_compile_output/passFilesToObject.ts";
import { passObjectFields } from "../passes/115_object_fields/passObjectFields.ts";

export async function initialResolve(url: URL): Promise<UnitModule> {
  const code = await passUrlToCode(url);
  const hash = hashModuleId(code.content);
  const token = /* 001 */ passCodeToToken(code);
  const ast = /* 005 */ passTokenToAst(hash, token);
  /* 099 */ passImportSchedule(url, ast);
  return {
    url: url,
    token: token,
    code: code,
    ast: ast,
  };
}

interface Pass {
  name: string;
  run: (unit: UnitModule) => Promise<void>;
}

function runSync(run: (unit: UnitModule) => void) {
  return (unit: UnitModule) => {
    run(unit);
    return Promise.resolve();
  };
}

const passes: Pass[] = [
  { name: "101", run: runSync(passExportRead) },
  { name: "103", run: runSync(passStatementCollector) },
  { name: "106", run: runSync(passImportLink) },
  { name: "113", run: runSync(passBinaryPrioritize) },
  { name: "115", run: runSync(passObjectFields) },
  { name: "123", run: runSync(passClosureResolve) },
  { name: "125", run: runSync(passReferenceResolve) },
  { name: "203.A", run: runSync(passTypeInferenceUpward) },
  { name: "203.B", run: runSync(passTypeInferenceUpward) },
  { name: "950", run: runSync(passAstToOutput) },
  { name: "960", run: passOutputToFiles },
  { name: "980", run: passFilesToObject },
];

interface ScheduledImport {
  url: URL;
  completion: (ast: AstModule) => void;
}

interface ScheduledCompile {
  unit: UnitModule;
}

const scheduledImports = new Array<ScheduledImport>();
const scheduledCompiles = new Array<ScheduledCompile>();

export function scheduleImport(url: URL, completion: (ast: AstModule) => void) {
  scheduledImports.push({ url: url, completion: completion });
}

export async function runLoop() {
  while (scheduledImports.length > 0) {
    const scheduledImport = scheduledImports.shift();
    if (scheduledImport) {
      const unit = await initialResolve(scheduledImport.url);
      scheduledImport.completion(unit.ast);
      scheduledCompiles.push({ unit: unit });
    }
  }

  for (const pass of passes) {
    for (const scheduledCompile of scheduledCompiles) {
      await pass.run(scheduledCompile.unit);
    }
  }

  await passObjectToBinary(
    scheduledCompiles[0].unit,
    scheduledCompiles.map((compile) => compile.unit),
  );
}
