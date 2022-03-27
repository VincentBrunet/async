import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { cacheFileFromHash } from '../../../lib/io/cacheFileFromHash.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { utilTranspileTypeAnnotation } from '../util/utilTranspileTypeAnnotation.ts';
import { astStatementAsTypedef, astStatementAsVariable } from '../../../data/ast/AstStatement.ts';

export function transpileModule(
  pass: RecursorPass,
  astModule: AstModule,
  transpiler: Transpiler,
): void {
  // Names
  const symbolGlobalFactoryPointer = ensure(astModule.symbolGlobalFactoryPointer);
  const symbolGlobalGetterPointer = ensure(astModule.symbolGlobalGetterPointer);
  const symbolGlobalModuleStruct = ensure(astModule.symbolGlobalModuleStruct);

  // Definition of module struct
  const fields: OutputStructField[] = [];
  for (const resolvedExport of ensure(astModule.resolvedExports).values()) {
    const variable = astStatementAsVariable(resolvedExport.statement);
    if (variable) {
      fields.push({
        name: variable.name,
        type: utilTranspileTypeAnnotation(ensure(variable.resolvedType)),
      });
    }
    const typedef = astStatementAsTypedef(resolvedExport.statement);
    if (typedef) {
      fields.push({
        name: typedef.name,
        type: 'TYPE',
      });
    }
  }
  transpiler.pushStruct(symbolGlobalModuleStruct, fields);

  // New module Factory function
  transpiler.pushFunction(symbolGlobalModuleStruct + '*', symbolGlobalFactoryPointer, []);
  transpiler.pushStatement([
    'static',
    ' ',
    symbolGlobalModuleStruct + '*',
    ' ',
    'module',
    ' = ',
    '0;',
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
    'module = malloc(sizeof(',
    symbolGlobalModuleStruct,
    '))',
  ]);

  // Recurse in module content
  transpiler.pushStatement(['/* module block */']);
  pass.recurseBlock(astModule.block);

  transpiler.pushStatement(['return module']);
}
