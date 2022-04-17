import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { ensure } from '../../errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';

export function transpileStatementVariable(
  pass: RecursorPass,
  astStatementVariable: AstStatementVariable,
  transpiler: Transpiler,
) {
  const symbolLocalVariable = ensure(astStatementVariable.symbolLocalVariable);

  const transpiledType = utilTranspileTypeToAnnotation(
    ensure(astStatementVariable.resolvedType),
    astStatementVariable.resolvedHeapized,
  );

  if (astStatementVariable.resolvedHeapized) {
    transpiler.pushStatement([
      transpiledType,
      ' ',
      symbolLocalVariable,
      ' = ',
    ]);
    if (astStatementVariable.value) {
      pass.recurseExpression(astStatementVariable.value);
    }
  } else {
    transpiler.pushStatement([
      transpiledType,
      ' ',
      symbolLocalVariable,
      ' = ',
    ]);
    if (astStatementVariable.value) {
      pass.recurseExpression(astStatementVariable.value);
    }
  }
  /*
  if (astStatementVariable.value) {
    transpiler.pushStatement([
      astStatementVariable.resolvedHeapized ? '(*' : '',
      ensure(astStatementVariable.symbolLocalVariable),
      astStatementVariable.resolvedHeapized ? ')' : '',
      ' = ',
    ]);
    pass.recurseExpression(astStatementVariable.value);
  }
  */
}
