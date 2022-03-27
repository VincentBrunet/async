import { MapArray } from '../../lib/core/data/MapArray.ts';
import { Ast } from './Ast.ts';
import { AstBlock } from './AstBlock.ts';
import { AstStatementExport } from './AstStatementExport.ts';
import { AstStatementImport } from './AstStatementImport.ts';

export interface AstModule extends Ast {
  hash: string;

  block: AstBlock;

  resolvedImports?: MapArray<string, AstStatementImport>;
  resolvedExports?: Map<string, AstStatementExport>;

  symbolGlobalFactoryPointer?: string;
  symbolGlobalGetterPointer?: string;
  symbolGlobalModuleStruct?: string;
}
