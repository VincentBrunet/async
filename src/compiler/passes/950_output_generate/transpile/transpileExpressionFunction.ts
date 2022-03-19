import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { hashGlobalSymbol } from '../../../lib/hash/hashGlobalSymbol.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { transpileResolvedClosure } from './transpileResolvedClosure.ts';

export function transpileExpressionFunction(
  pass: RecursorPass,
  ast: AstExpressionFunction,
  transpiler: Transpiler,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Generate a stable unique name
  const name = hashGlobalSymbol(
    transpiler.getUnit().ast.hash,
    ast,
    'function',
  );

  // Make the struct for the
  const closureParts: OutputStructField[] = [];
  for (const astClosure of resolvedClosures) {
    closureParts.push({
      name: astClosure.name,
      type: 'int', // TODO
      //type: JSON.stringify(astClosure.resolvedType),
    });
  }
  transpiler.pushStruct('closure_' + name, closureParts);

  // Simply call the function factory
  const functionMakeLength = resolvedClosures.length.toString();
  const functionMakeVariadic = resolvedClosures.length > 9;
  transpiler.pushStatementPart('function_make_');
  if (functionMakeVariadic) {
    transpiler.pushStatementPart('x');
  } else {
    transpiler.pushStatementPart(functionMakeLength);
  }
  transpiler.pushStatementPart('(');
  transpiler.pushStatementPart('type_function'); // TODO,
  transpiler.pushStatementPart(', ');
  transpiler.pushStatementPart('(void*)&');
  transpiler.pushStatementPart(name);
  if (functionMakeVariadic) {
    transpiler.pushStatementPart(', ');
    transpiler.pushStatementPart(functionMakeLength);
  }
  for (const astClosure of resolvedClosures) {
    transpiler.pushStatementPart(', ');
    transpileResolvedClosure(astClosure, transpiler);
  }
  transpiler.pushStatementPart(')');

  // New function
  const params = [];
  params.push('t_ref **closure');
  for (let i = 0; i < ast.params.length; i++) {
    const astParam = ast.params[i];
    if (astParam.name) {
      params.push('t_value *_param_' + astParam.name);
    } else {
      params.push('t_value *_param' + i);
    }
  }
  transpiler.pushFunction('t_value *', name, params);

  // Push block statements
  transpiler.pushStatement(['/* function block */']);
  pass.recurseBlock(ast.block);

  // Backup return
  transpiler.pushStatement(['return', ' ', 'null_make()']);

  // Done
  transpiler.popFunction();
}
