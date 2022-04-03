import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { OutputFunctionParam } from '../../../data/output/OutputFunction.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceValueClosureToAnnotation } from '../util/utilTranspileReferenceValueClosureToAnnotation.ts';
import { utilTranspileReferenceValueClosureToExpression } from '../util/utilTranspileReferenceValueClosureToExpression.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';

export function transpileExpressionFunction(
  pass: RecursorPass,
  astExpressionFunction: AstExpressionFunction,
  transpiler: Transpiler,
) {
  const referenceValueClosures = ensure(astExpressionFunction.referenceValueClosures);

  const symbolGlobalCallableFunction = ensure(astExpressionFunction.symbolGlobalCallableFunction);
  const symbolGlobalFactoryFunction = ensure(astExpressionFunction.symbolGlobalFactoryFunction);
  const symbolGlobalClosureStruct = ensure(astExpressionFunction.symbolGlobalClosureStruct);

  // Make the expression by just calling the factory
  transpiler.pushStatementPart(symbolGlobalFactoryFunction);
  transpiler.pushStatementPart('(');
  for (const referenceValueClosure of referenceValueClosures) {
    if (referenceValueClosure.idx !== 0) {
      transpiler.pushStatementPart(', ');
    }
    transpiler.pushStatementPart(utilTranspileReferenceValueClosureToExpression(referenceValueClosure));
  }
  transpiler.pushStatementPart(')');

  // Make the closure struct
  const closureParts: OutputStructField[] = [];
  for (const referenceValueClosure of referenceValueClosures) {
    closureParts.push({
      name: referenceValueClosure.name,
      type: utilTranspileReferenceValueClosureToAnnotation(referenceValueClosure),
    });
  }
  transpiler.pushStruct(symbolGlobalClosureStruct, closureParts);

  // Make the factory function
  const transpiledType = utilTranspileTypeToAnnotation(ensure(astExpressionFunction.resolvedType), false);
  transpiler.pushFunction(
    transpiledType,
    symbolGlobalFactoryFunction,
    referenceValueClosures.map((referenceValueClosure) => {
      return {
        name: referenceValueClosure.name,
        type: utilTranspileReferenceValueClosureToAnnotation(referenceValueClosure),
      };
    }),
  );
  transpiler.pushStatement([transpiledType, ' ', 'fn = malloc(sizeof(', transpiledType, '))']);
  transpiler.pushStatement([symbolGlobalClosureStruct, ' ', 'closure = malloc(sizeof(', symbolGlobalClosureStruct, '))']);
  for (const referenceValueClosure of referenceValueClosures) {
    transpiler.pushStatement(['closure.', referenceValueClosure.name, ' = ', referenceValueClosure.name]);
  }
  transpiler.pushStatement(['fn.callable = ', symbolGlobalCallableFunction]);
  transpiler.pushStatement(['fn.closure = closure']);
  transpiler.pushStatement(['return fn']);
  transpiler.popFunction();

  // Make the callable function
  const params: OutputFunctionParam[] = [];
  params.push({
    type: symbolGlobalClosureStruct + '*',
    name: ensure(astExpressionFunction.symbolLocalClosureValue),
  });
  for (let i = 0; i < astExpressionFunction.params.length; i++) {
    const astParam = astExpressionFunction.params[i];
    const astParamType = utilTranspileTypeToAnnotation(ensure(astParam.resolvedType), false);
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

  const returnType = utilTranspileTypeToAnnotation(ensure(astExpressionFunction.resolvedTypeRet), false);
  transpiler.pushFunction(returnType, symbolGlobalCallableFunction, params);

  // Push block statements
  transpiler.pushStatement(['/* function block */']);
  pass.recurseBlock(astExpressionFunction.block);

  // Backup return
  transpiler.pushStatement(['return', ' ', 'null_make()']);

  // Done
  transpiler.popFunction();
}
