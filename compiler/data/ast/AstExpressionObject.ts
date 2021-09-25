import { Ast } from "./Ast.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstStatementReturn } from "./AstStatementReturn.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionObject extends Ast {
  annotation: AstAnnotationType;
  block: AstBlock;

  resolvedType?: AstType;
  resolvedClosures?: Array<AstResolvedClosure>;
  resolvedVariables?: Array<AstStatementVariable>;
  resolvedReturns?: Array<AstStatementReturn>;
}
