import { AstResolvedShorthand } from "./AstResolvedShorthand.ts";
import { AstType } from "./AstType.ts";

export interface AstTypeIdentifier {
  name: string;
  params: Array<AstType>;
  resolved?: AstResolvedShorthand;
}
