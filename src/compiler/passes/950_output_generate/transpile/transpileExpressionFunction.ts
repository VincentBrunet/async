import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { OutputFunctionParam } from '../../../data/output/OutputFunction.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { hashGlobalSymbol } from '../../../passes/hash/hashGlobalSymbol.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceValueClosure } from '../util/utilTranspileReferenceValueClosure.ts';
import { utilTranspileType } from '../util/utilTranspileType.ts';

export function transpileExpressionFunction(
  pass: RecursorPass,
  ast: AstExpressionFunction,
  transpiler: Transpiler,
) {
  const referenceValueClosures = ensure(ast.referenceValueClosures);

  // Generate a stable unique name
  const name = hashGlobalSymbol(
    transpiler.getUnit().ast.hash,
    ast,
    'function',
  );

  // Make the struct for the
  const closureParts: OutputStructField[] = [];
  for (const referenceValueClosure of referenceValueClosures) {
    closureParts.push({
      name: referenceValueClosure.name,
      type: 'int', // TODO
      //type: JSON.stringify(referenceValueClosure.resolvedType),
    });
  }
  transpiler.pushStruct('closure_' + name, closureParts);

  // Simply call the function factory
  const functionMakeLength = referenceValueClosures.length.toString();
  const functionMakeVariadic = referenceValueClosures.length > 9;
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
  for (const referenceValueClosure of referenceValueClosures) {
    transpiler.pushStatementPart(', ');
    utilTranspileReferenceValueClosure(referenceValueClosure, transpiler);
  }
  transpiler.pushStatementPart(')');

  // New function
  const params: OutputFunctionParam[] = [];
  params.push({
    type: 't_closure',
    name: 'closure',
  });
  for (let i = 0; i < ast.params.length; i++) {
    const astParam = ast.params[i];
    const astParamType = utilTranspileType(ensure(astParam.resolvedType), false);
    if (astParam.name) {
      params.push({
        type: astParamType,
        name: '_param_' + astParam.name,
      });
    } else {
      params.push({
        type: astParamType,
        name: '_param' + i,
      });
    }
  }

  const returnType = utilTranspileType(ensure(ast.resolvedTypeRet), false);
  transpiler.pushFunction(returnType, name, params);

  // Push block statements
  transpiler.pushStatement(['/* function block */']);
  pass.recurseBlock(ast.block);

  // Backup return
  transpiler.pushStatement(['return', ' ', 'null_make()']);

  // Done
  transpiler.popFunction();
}
