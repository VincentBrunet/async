import { AstModule } from '../../../data/ast/AstModule.ts';
import { hashFileSymbol } from '../util/hashFileSymbol.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseModule(
  astModule: AstModule,
): void {
  astModule.symbolGlobalGetterFunction = hashGlobalSymbol(astModule.hash, astModule, 'module_getter');
  astModule.symbolGlobalExportStruct = hashGlobalSymbol(astModule.hash, astModule, 'module_export');
  astModule.symbolFileFactoryFunction = hashFileSymbol(astModule, 'module_factory');
  astModule.symbolLocalModuleValue = hashLocalSymbol('module', 'export');
}
