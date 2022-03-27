import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { utilTranspileTypeAnnotation } from '../util/utilTranspileTypeAnnotation.ts';
import { astStatementAsStatementTypedef, astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';

export function transpileModule(
  pass: RecursorPass,
  astModule: AstModule,
  transpiler: Transpiler,
): void {
  // Names
  const symbolGlobalFactoryPointer = ensure(astModule.symbolGlobalFactoryPointer);
  const symbolGlobalExportStruct = ensure(astModule.symbolGlobalExportStruct);
  const symbolLocalModuleValue = ensure(astModule.symbolLocalModuleValue);

  // Definition of module struct
  const fields: OutputStructField[] = [];
  for (const resolvedExport of ensure(astModule.resolvedExports).values()) {
    const statementVariable = astStatementAsStatementVariable(resolvedExport.statement);
    if (statementVariable) {
      fields.push({
        name: statementVariable.name,
        type: utilTranspileTypeAnnotation(
          ensure(statementVariable.resolvedType),
          statementVariable.mutable,
        ),
      });
    }
    const typedef = astStatementAsStatementTypedef(resolvedExport.statement);
    if (typedef) {
      fields.push({
        name: typedef.name,
        type: 'TYPE',
      });
    }
  }
  transpiler.pushStruct(symbolGlobalExportStruct, fields);

  // New module Factory function
  transpiler.pushFunction(symbolGlobalExportStruct + '*', symbolGlobalFactoryPointer, []);
  transpiler.pushStatement([
    'static',
    ' ',
    symbolGlobalExportStruct + '*',
    ' ',
    symbolLocalModuleValue,
    ' = ',
    'NULL',
  ]);
  transpiler.pushStatement([
    'if (module != 0)',
  ]);
  transpiler.pushBlock();
  transpiler.pushStatement([
    'return module',
  ]);
  transpiler.popBlock();
  transpiler.pushStatement([
    symbolLocalModuleValue,
    ' = malloc(sizeof(',
    symbolGlobalExportStruct,
    '))',
  ]);

  // Recurse in module content
  transpiler.pushStatement(['/* module block */']);
  pass.recurseBlock(astModule.block);

  transpiler.pushStatement(['return module']);
}
