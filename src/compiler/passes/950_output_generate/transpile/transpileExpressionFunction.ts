import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { OutputFunctionParam } from '../../../data/output/OutputFunction.ts';
import { OutputStructField } from '../../../data/output/OutputStructs.ts';
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
  astExpressionFunction: AstExpressionFunction,
  transpiler: Transpiler,
) {
  const referenceClosures = ensure(astExpressionFunction.referenceClosures);

  const symbolFileImplementationFunction = ensure(astExpressionFunction.symbolFileImplementationFunction);
  const symbolFileFactoryFunction = ensure(astExpressionFunction.symbolFileFactoryFunction);
  const symbolFileClosureStruct = ensure(astExpressionFunction.symbolFileClosureStruct);
  const symbolFileCallableStruct = ensure(astExpressionFunction.symbolFileCallableStruct);
  const symbolLocalClosureVariable = ensure(astExpressionFunction.symbolLocalClosureVariable);
  const symbolLocalCallableVariable = ensure(astExpressionFunction.symbolLocalCallableVariable);

  const transpiledType = utilTranspileTypeToAnnotation(
    ensure(astExpressionFunction.resolvedType),
    false,
  );
  const transpiledTypeCallable = transpiledType.replace(
    'ac::function',
    'ac::callable',
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
      name: referenceClosure.name,
      type: utilTranspileReferenceClosureToAnnotation(referenceClosure),
    });
  }
  transpiler.pushStruct(
    false,
    symbolFileClosureStruct,
    closureParts,
  );

  // Make the callable struct
  const callableParts: OutputStructField[] = [];
  callableParts.push({
    name: 'closure',
    type: symbolFileClosureStruct,
  });
  callableParts.push({
    type: '/**/', // TODO - remove hacks
    name: [
      'virtual ',
      utilTranspileTypeToAnnotation(
        ensure(astExpressionFunction.ret.resolvedType),
        false,
      ),
      ' call',
      '(',
      astExpressionFunction.params.map((param, index) => {
        const type = utilTranspileTypeToAnnotation(ensure(param.resolvedType), false);
        return type + ' p' + index.toString();
      }).join(', '),
      ')',
      '{ ',
      'return ',
      symbolFileImplementationFunction,
      '(',
      [
        'closure',
        ...astExpressionFunction.params.map((param, index) => {
          return 'p' + index.toString();
        }),
      ].join(', '),
      ');',
      ' }',
    ].join(''),
  });
  callableParts.push({
    type: '/**/', // TODO - remove hacks
    name: [
      'virtual ',
      '~',
      symbolFileCallableStruct,
      '() {}',
    ].join(''),
  });
  transpiler.pushStruct(
    false,
    symbolFileCallableStruct,
    callableParts,
    transpiledTypeCallable,
  );

  // Make the factory function
  transpiler.pushFunction(
    false,
    transpiledType,
    symbolFileFactoryFunction,
    referenceClosures.map((referenceClosure) => {
      return {
        name: ensure(referenceClosure.symbolLocalVariable),
        type: utilTranspileReferenceClosureToAnnotation(referenceClosure),
      };
    }),
  );
  transpiler.pushStatement([symbolFileCallableStruct, '* ', symbolLocalCallableVariable, ' = new ', symbolFileCallableStruct, '()']);
  transpiler.pushStatement([symbolFileClosureStruct, '& ', symbolLocalClosureVariable, ' = ', symbolLocalCallableVariable, '->closure']);
  for (const referenceClosure of referenceClosures) {
    transpiler.pushStatement([
      symbolLocalClosureVariable,
      '.',
      referenceClosure.name,
      ' = ',
      ensure(referenceClosure.symbolLocalVariable),
    ]);
  }
  transpiler.pushStatement(['return', ' ', transpiledType, '(', symbolLocalCallableVariable, ')']);
  transpiler.popFunction();

  // Make the callable function
  const params: OutputFunctionParam[] = [];
  params.push({
    type: symbolFileClosureStruct + '&',
    name: symbolLocalClosureVariable,
  });
  for (const astExpressionFunctionParam of astExpressionFunction.params) {
    const astExpressionFunctionParamType = utilTranspileTypeToAnnotation(
      ensure(astExpressionFunctionParam.resolvedType),
      false,
    );
    params.push({
      type: astExpressionFunctionParamType,
      name: ensure(astExpressionFunctionParam.symbolLocalVariable),
    });
  }
  const returnType = utilTranspileTypeToAnnotation(
    ensure(astExpressionFunction.ret.resolvedType),
    false,
  );
  transpiler.pushFunction(false, returnType, symbolFileImplementationFunction, params);

  // Localize closure
  for (const referenceClosure of referenceClosures) {
    transpiler.pushStatement([
      utilTranspileReferenceClosureToAnnotation(referenceClosure),
      ' ',
      ensure(referenceClosure.symbolLocalVariable),
      ' = ',
      symbolLocalClosureVariable,
      '.',
      referenceClosure.name,
    ]);
  }

  // Push block statements
  transpiler.pushStatement(['/* function block */']);
  pass.recurseBlock(astExpressionFunction.block);

  if (isTypePrimitive(ensure(astExpressionFunction.ret.resolvedType), AstTypePrimitiveNative.Nothing)) {
    transpiler.pushStatement(['return {}']);
  }
  // Done
  transpiler.popFunction();
}
