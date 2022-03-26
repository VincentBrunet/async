import { AstModule } from '../../../data/ast/AstModule.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { hashGlobalSymbol } from '../../../passes/hash/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../../../passes/hash/hashLocalSymbol.ts';
import { cacheFileFromHash } from '../../../lib/io/cacheFileFromHash.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { utilTranspileType } from '../util/utilTranspileType.ts';
import { astStatementAsTypedef, astStatementAsVariable } from '../../../data/ast/AstStatement.ts';

export function transpileModule(
  pass: RecursorPass,
  ast: AstModule,
  transpiler: Transpiler,
) {
  // Names
  const hash = ast.hash;
  const nameStruct = hashGlobalSymbol(hash, ast, 'module');
  const nameFactory = hashGlobalSymbol(hash, ast, 'factory');

  // Include
  transpiler.pushInclude(cacheFileFromHash(hash, 'output.h'));

  // Definition of module struct
  const fields: OutputStructField[] = [];
  for (const resolvedExport of ensure(ast.resolvedExports).values()) {
    const variable = astStatementAsVariable(resolvedExport.statement);
    if (variable) {
      fields.push({
        name: variable.name,
        type: utilTranspileType(ensure(variable.resolvedType), variable.resolvedDynamic),
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
  transpiler.pushStruct(nameStruct, fields);

  // New module Factory function
  transpiler.pushFunction(nameStruct + '*', nameFactory, []);
  transpiler.pushStatement([
    'static',
    ' ',
    nameStruct + '*',
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
    nameStruct,
    '))',
  ]);

  // Recurse in module content
  transpiler.pushStatement(['/* module block */']);
  pass.recurseBlock(ast.block);

  transpiler.pushStatement(['return module']);
}
