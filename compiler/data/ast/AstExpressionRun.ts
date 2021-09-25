import { Ast } from "./Ast.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstStatementReturn } from "./AstStatementReturn.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionRun extends Ast {
  annotation: AstAnnotationType;
  block: AstBlock;

  resolvedType?: AstType;
  resolvedClosures?: Array<AstResolvedClosure>;
  resolvedReturns?: Array<AstStatementReturn>;
}
