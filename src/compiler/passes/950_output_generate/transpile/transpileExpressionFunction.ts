import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { OutputFunctionParam } from '../../../data/output/OutputFunction.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceValueClosure } from '../util/utilTranspileReferenceValueClosure.ts';
import { utilTranspileTypeAnnotation } from '../util/utilTranspileTypeAnnotation.ts';

export function transpileExpressionFunction(
  pass: RecursorPass,
  astExpressionFunction: AstExpressionFunction,
  transpiler: Transpiler,
) {
  const referenceValueClosures = ensure(astExpressionFunction.referenceValueClosures);

  const symbolGlobalCallableFunction = ensure(astExpressionFunction.symbolGlobalCallableFunction);
  const symbolGlobalClosureStruct = ensure(astExpressionFunction.symbolGlobalClosureStruct);

  // Make the struct for the
  const closureParts: OutputStructField[] = [];
  for (const referenceValueClosure of referenceValueClosures) {
    closureParts.push({
      name: referenceValueClosure.name,
      type: utilTranspileTypeAnnotation(ensure(referenceValueClosure.resolvedType)),
    });
  }
  transpiler.pushStruct(symbolGlobalClosureStruct, closureParts);

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
  transpiler.pushStatementPart(symbolGlobalCallableFunction);
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
    type: symbolGlobalClosureStruct,
    name: 'closure',
  });
  for (let i = 0; i < astExpressionFunction.params.length; i++) {
    const astParam = astExpressionFunction.params[i];
    const astParamType = utilTranspileTypeAnnotation(ensure(astParam.resolvedType));
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

  const returnType = utilTranspileTypeAnnotation(ensure(astExpressionFunction.resolvedTypeRet));
  transpiler.pushFunction(returnType, symbolGlobalCallableFunction, params);

  // Push block statements
  transpiler.pushStatement(['/* function block */']);
  pass.recurseBlock(astExpressionFunction.block);

  // Backup return
  transpiler.pushStatement(['return', ' ', 'null_make()']);

  // Done
  transpiler.popFunction();
}
