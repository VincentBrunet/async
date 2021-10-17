import { MapArray } from "../../lib/core/data/MapArray.ts";
import { TokenModule } from "../token/TokenModule.ts";
import { Ast } from "./Ast.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstStatementExport } from "./AstStatementExport.ts";
import { AstStatementImport } from "./AstStatementImport.ts";

export interface AstModule extends Ast {
  sourceToken: TokenModule;

  block: AstBlock;

  resolvedImports?: MapArray<string, AstStatementImport>;
  resolvedExports?: MapArray<string, AstStatementExport>;
}
