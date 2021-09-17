import { AstType } from "./AstType.ts";

export interface AstTypeIdentifier {
  name: string;
  resolved?: AstType;
}
