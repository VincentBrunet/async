import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';
import { astStatementAsStatementTypedef, astStatementAsStatementVariable } from '../../../data/ast/AstStatement.ts';

export function transpileModule(
  pass: RecursorPass,
  astModule: AstModule,
  transpiler: Transpiler,
): void {
  // Names
  const symbolGlobalGetterFunction = ensure(astModule.symbolGlobalGetterFunction);
  const symbolGlobalExportStruct = ensure(astModule.symbolGlobalExportStruct);
  const symbolFileFactoryFunction = ensure(astModule.symbolFileFactoryFunction);
  const symbolLocalModuleVariable = ensure(astModule.symbolLocalModuleVariable);

  const collectedExportsByName = ensure(astModule.collectedExportsByName);

  // Definition of module struct
  const fields: OutputStructField[] = [];
  for (const collectedExport of collectedExportsByName.values()) {
    const statementVariable = astStatementAsStatementVariable(collectedExport.statement);
    if (statementVariable) {
      fields.push({
        name: statementVariable.name,
        type: utilTranspileTypeToAnnotation(
          ensure(statementVariable.resolvedType),
          statementVariable.resolvedHeapized,
        ),
      });
    }

    const typedef = astStatementAsStatementTypedef(collectedExport.statement);
    if (typedef) {
      /*
      fields.push({
        name: typedef.name,
        type: 'TYPE',
      });
      */
    }
  }
  transpiler.pushStruct(
    true,
    symbolGlobalExportStruct,
    fields,
  );

  // New module factory function
  transpiler.pushFunction(false, symbolGlobalExportStruct + '*', symbolFileFactoryFunction, []);
  transpiler.pushStatement([symbolGlobalExportStruct, '* ', symbolLocalModuleVariable, ' = new ', symbolGlobalExportStruct, '()']);

  for (const collectedExport of collectedExportsByName.values()) {
    const statementVariable = astStatementAsStatementVariable(collectedExport.statement);
    if (statementVariable) {
      transpiler.pushStatement([
        utilTranspileTypeToAnnotation(
          ensure(statementVariable.resolvedType),
          statementVariable.resolvedHeapized,
        ),
        '& ',
        ensure(collectedExport.symbolLocalVariable),
        ' = ',
        symbolLocalModuleVariable,
        '->',
        statementVariable.name,
      ]);
    }
  }

  transpiler.pushStatement(['/* module block */']);
  pass.recurseBlock(astModule.block);

  transpiler.pushStatement(['return ', symbolLocalModuleVariable]);
  transpiler.popFunction();

  // New module getter function
  transpiler.pushFunction(true, symbolGlobalExportStruct + '*', symbolGlobalGetterFunction, []);
  transpiler.pushStatement([
    'static ',
    symbolGlobalExportStruct,
    '* ',
    symbolLocalModuleVariable,
    ' = ',
    symbolFileFactoryFunction,
    '()',
  ]);
  transpiler.pushStatement(['return ', symbolLocalModuleVariable]);
  transpiler.popFunction();
}
