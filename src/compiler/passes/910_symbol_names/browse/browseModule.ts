import { AstModule } from '../../../data/ast/AstModule.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseModule(
  astModule: AstModule,
): void {
  astModule.symbolGlobalFactoryPointer = hashGlobalSymbol(astModule.hash, astModule, 'module_factory');
  astModule.symbolGlobalExportStruct = hashGlobalSymbol(astModule.hash, astModule, 'module_export');
  astModule.symbolLocalModuleValue = hashLocalSymbol('module', '');
}
