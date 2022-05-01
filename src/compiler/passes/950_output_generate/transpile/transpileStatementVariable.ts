import { AstStatementVariable } from '../../../data/ast/AstStatementVariable.ts';
import { ensure } from '../../errors/ensure.ts';
import { RecursorPass } from '../../util/RecursorPass.ts';
import { Transpiler } from '../util/Transpiler.ts';
import { utilTranspileTypeToAnnotation } from '../util/utilTranspileTypeToAnnotation.ts';

export function transpileStatementVariable(
  pass: RecursorPass,
  statementVariable: AstStatementVariable,
  transpiler: Transpiler,
) {
  const symbolLocalVariable = ensure(statementVariable.symbolLocalVariable);

  const statementVariableType = ensure(statementVariable.resolvedType);

  const transpiledType = utilTranspileTypeToAnnotation(statementVariableType, statementVariable.resolvedHeapized);

  if (statementVariable.resolvedHeapized) {
    const transpiledTypeBase = utilTranspileTypeToAnnotation(statementVariableType, false);
    transpiler.pushStatement([transpiledType, ' ', symbolLocalVariable, '(new ', transpiledTypeBase, ')']);
    if (statementVariable.value) {
      transpiler.pushStatement(['*', symbolLocalVariable, ' = ']);
      pass.recurseExpression(statementVariable.value);
    }
  } else {
    transpiler.pushStatement([transpiledType, ' ', symbolLocalVariable]);
    if (statementVariable.value) {
      transpiler.pushStatement([symbolLocalVariable, ' = ']);
      pass.recurseExpression(statementVariable.value);
    }
  }
}
