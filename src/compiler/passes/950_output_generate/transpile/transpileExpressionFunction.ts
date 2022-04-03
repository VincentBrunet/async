import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { OutputFunctionParam } from '../../../data/output/OutputFunction.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileReferenceClosureToAnnotation } from '../util/utilTranspileReferenceClosureToAnnotation.ts';
import { utilTranspileReferenceClosureToExpression } from '../util/utilTranspileReferenceClosureToExpression.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';

export function transpileExpressionFunction(
  pass: RecursorPass,
  astExpressionFunction: AstExpressionFunction,
  transpiler: Transpiler,
) {
  const referenceClosures = ensure(astExpressionFunction.referenceClosures);

  const symbolGlobalCallableFunction = ensure(astExpressionFunction.symbolGlobalCallableFunction);
  const symbolGlobalFactoryFunction = ensure(astExpressionFunction.symbolGlobalFactoryFunction);
  const symbolFileClosureStruct = ensure(astExpressionFunction.symbolFileClosureStruct);

  // Make the expression by just calling the factory
  transpiler.pushStatementPart(symbolGlobalFactoryFunction);
  transpiler.pushStatementPart('(');
  for (const referenceClosure of referenceClosures) {
    if (referenceClosure.idx !== 0) {
      transpiler.pushStatementPart(', ');
    }
    transpiler.pushStatementPart(utilTranspileReferenceClosureToExpression(referenceClosure));
  }
  transpiler.pushStatementPart(')');

  // Make the closure struct
  const closureParts: OutputStructField[] = [];
  for (const referenceClosure of referenceClosures) {
    closureParts.push({
      name: referenceClosure.name,
      type: utilTranspileReferenceClosureToAnnotation(referenceClosure),
    });
  }
  transpiler.pushStruct(symbolFileClosureStruct, closureParts);

  // Make the factory function
  const transpiledType = utilTranspileTypeToAnnotation(ensure(astExpressionFunction.resolvedType), false);
  transpiler.pushFunction(
    transpiledType,
    symbolGlobalFactoryFunction,
    referenceClosures.map((referenceClosure) => {
      return {
        name: referenceClosure.name,
        type: utilTranspileReferenceClosureToAnnotation(referenceClosure),
      };
    }),
  );
  transpiler.pushStatement([transpiledType, ' ', 'fn = malloc(sizeof(', transpiledType, '))']);
  transpiler.pushStatement([symbolFileClosureStruct, ' ', 'closure = new ', symbolFileClosureStruct, '()']);
  for (const referenceClosure of referenceClosures) {
    transpiler.pushStatement(['closure.', referenceClosure.name, ' = ', referenceClosure.name]);
  }
  transpiler.pushStatement(['fn.callable = ', symbolGlobalCallableFunction]);
  transpiler.pushStatement(['fn.closure = closure']);
  transpiler.pushStatement(['return fn']);
  transpiler.popFunction();

  // Make the callable function
  const params: OutputFunctionParam[] = [];
  params.push({
    type: symbolFileClosureStruct + '*',
    name: ensure(astExpressionFunction.symbolLocalClosureValue),
  });
  astExpressionFunction.params.forEach((astExpressionFunctionParam, index) => {
    const astExpressionFunctionParamType = utilTranspileTypeToAnnotation(
      ensure(astExpressionFunctionParam.resolvedType),
      false,
    );
    if (astExpressionFunctionParam.name) {
      params.push({
        type: astExpressionFunctionParamType,
        name: '_param_' + astExpressionFunctionParam.name,
      });
    } else {
      params.push({
        type: astExpressionFunctionParamType,
        name: '_param' + index,
      });
    }
  });

  const returnType = utilTranspileTypeToAnnotation(
    ensure(astExpressionFunction.resolvedTypeRet),
    false,
  );
  transpiler.pushFunction(returnType, symbolGlobalCallableFunction, params);

  // Push block statements
  transpiler.pushStatement(['/* function block */']);
  pass.recurseBlock(astExpressionFunction.block);

  // Done
  transpiler.popFunction();
}
