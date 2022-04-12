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

  const symbolFileCallableFunction = ensure(astExpressionFunction.symbolFileCallableFunction);
  const symbolFileFactoryFunction = ensure(astExpressionFunction.symbolFileFactoryFunction);
  const symbolFileClosureStruct = ensure(astExpressionFunction.symbolFileClosureStruct);
  const symbolLocalClosureValue = ensure(astExpressionFunction.symbolLocalClosureValue);

  const transpiledType = utilTranspileTypeToAnnotation(
    ensure(astExpressionFunction.resolvedType),
    false,
  );

  // Make the expression by just calling the factory
  transpiler.pushStatementPart(symbolFileFactoryFunction);
  transpiler.pushStatementPart('(');
  referenceClosures.forEach((referenceClosure, index) => {
    if (index !== 0) {
      transpiler.pushStatementPart(', ');
    }
    transpiler.pushStatementPart(utilTranspileReferenceClosureToExpression(referenceClosure));
  });
  transpiler.pushStatementPart(')');

  // Make the closure struct
  const closureParts: OutputStructField[] = [];
  for (const referenceClosure of referenceClosures) {
    closureParts.push({
      name: '_' + referenceClosure.name,
      type: utilTranspileReferenceClosureToAnnotation(referenceClosure),
    });
  }
  transpiler.pushStruct(
    false,
    symbolFileClosureStruct,
    closureParts,
    transpiledType.replace('ac::function', 'ac::callable'),
  );

  // Make the factory function
  transpiler.pushFunction(
    false,
    transpiledType,
    symbolFileFactoryFunction,
    referenceClosures.map((referenceClosure) => {
      return {
        name: referenceClosure.name,
        type: utilTranspileReferenceClosureToAnnotation(referenceClosure),
      };
    }),
  );
  transpiler.pushStatement([symbolFileClosureStruct, '* ', 'closure = new ', symbolFileClosureStruct, '()']);
  transpiler.pushStatement(['closure->ptr = ', symbolFileCallableFunction]);
  for (const referenceClosure of referenceClosures) {
    transpiler.pushStatement(['closure->', '_' + referenceClosure.name, ' = ', referenceClosure.name]);
  }
  transpiler.pushStatement(['return', ' ', transpiledType, '(closure)']);
  transpiler.popFunction();

  // Make the callable function
  const params: OutputFunctionParam[] = [];
  params.push({
    type: 'void *',
    name: '_' + symbolLocalClosureValue,
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
    ensure(astExpressionFunction.ret.resolvedType),
    false,
  );
  transpiler.pushFunction(false, returnType, symbolFileCallableFunction, params);

  transpiler.pushStatement([
    symbolFileClosureStruct,
    '* ',
    symbolLocalClosureValue,
    ' = ',
    '(',
    symbolFileClosureStruct,
    '*)',
    '_',
    symbolLocalClosureValue,
  ]);

  // Push block statements
  transpiler.pushStatement(['/* function block */']);
  pass.recurseBlock(astExpressionFunction.block);

  // Done
  transpiler.popFunction();
}
