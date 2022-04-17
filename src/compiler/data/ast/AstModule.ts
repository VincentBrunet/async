import { MapArray } from '../../lib/core/data/MapArray.ts';
import { Ast } from './Ast.ts';
import { AstBlock } from './AstBlock.ts';
import { AstStatementExport } from './AstStatementExport.ts';
import { AstStatementImport } from './AstStatementImport.ts';

export interface AstModule extends Ast {
  hash: string;

  block: AstBlock;

  collectedImportsByModuleHash?: MapArray<string, AstStatementImport>;
  collectedExportsByName?: Map<string, AstStatementExport>;

  symbolGlobalGetterFunction?: string;
  symbolGlobalExportStruct?: string;
  symbolFileFactoryFunction?: string;
  symbolLocalModuleVariable?: string;
}
