import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { isTypePrimitive } from '../../../lib/typing/isTypePrimitive.ts';
import { utilTranspileReferenceClosureToAnnotation } from '../util/utilTranspileReferenceClosureToAnnotation.ts';
import { utilTranspileReferenceClosureToExpression } from '../util/utilTranspileReferenceClosureToExpression.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';
import { AstTypePrimitiveNative } from '../../../data/ast/AstTypePrimitive.ts';

export function transpileExpressionFunction(
  pass: RecursorPass,
  expressionFunction: AstExpressionFunction,
  transpiler: Transpiler,
) {
  const referenceClosures = ensure(expressionFunction.referenceClosures);

  const symbolFileFactoryFunction = ensure(expressionFunction.symbolFileFactoryFunction);

  const expressionFunctionParams = expressionFunction.params;

  const expressionFunctionReturnType = ensure(expressionFunction.ret.resolvedType);

  // Make the expression by just calling the factory
  transpiler.pushStatementPart(symbolFileFactoryFunction);
  transpiler.pushStatementPart('(');
  for (let i = 0; i < referenceClosures.length; i++) {
    const referenceClosure = referenceClosures[i];
    if (i !== 0) {
      transpiler.pushStatementPart(', ');
    }
    transpiler.pushStatementPart(utilTranspileReferenceClosureToExpression(referenceClosure));
  }
  transpiler.pushStatementPart(')');

  // Make the factory function
  transpiler.pushFunction(
    false,
    utilTranspileTypeToAnnotation(ensure(expressionFunction.resolvedType), false),
    symbolFileFactoryFunction,
    referenceClosures.map((referenceClosure) => {
      return {
        name: ensure(referenceClosure.symbolLocalVariable),
        type: utilTranspileReferenceClosureToAnnotation(referenceClosure),
      };
    }),
  );

  transpiler.pushStatement([]);

  transpiler.pushStatementPart('return');
  transpiler.pushStatementPart(' ');

  transpiler.pushStatementPart('[');
  for (let i = 0; i < referenceClosures.length; i++) {
    const referenceClosure = referenceClosures[i];
    if (i !== 0) {
      transpiler.pushStatementPart(', ');
    }
    transpiler.pushStatementPart(ensure(referenceClosure.symbolLocalVariable));
  }
  transpiler.pushStatementPart(']');

  transpiler.pushStatementPart('(');
  for (let i = 0; i < expressionFunctionParams.length; i++) {
    const expressionFunctionParam = expressionFunctionParams[i];
    if (i !== 0) {
      transpiler.pushStatementPart(', ');
    }
    transpiler.pushStatementPart(utilTranspileTypeToAnnotation(ensure(expressionFunctionParam.resolvedType), false));
    transpiler.pushStatementPart(' ');
    transpiler.pushStatementPart(ensure(expressionFunctionParam.symbolLocalVariable));
  }
  transpiler.pushStatementPart(')');

  transpiler.pushStatementPart(' -> ');
  transpiler.pushStatementPart(utilTranspileTypeToAnnotation(expressionFunctionReturnType, false));

  transpiler.pushBlock();

  transpiler.pushStatement([], false);
  pass.recurseBlock(expressionFunction.block);

  if (isTypePrimitive(expressionFunctionReturnType, AstTypePrimitiveNative.Nothing)) {
    transpiler.pushStatement(['return {}']);
  }

  transpiler.popBlock();

  transpiler.popFunction();
}
