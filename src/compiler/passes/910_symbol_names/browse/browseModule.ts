import { AstModule } from '../../../data/ast/AstModule.ts';
import { hashGlobalSymbol } from '../util/hashGlobalSymbol.ts';

export function browseModule(
  astModule: AstModule,
): void {
  astModule.symbolGlobalFactoryPointer = hashGlobalSymbol(astModule.hash, astModule, 'factory');
  astModule.symbolGlobalGetterPointer = hashGlobalSymbol(astModule.hash, astModule, 'getter');
  astModule.symbolGlobalModuleStruct = hashGlobalSymbol(astModule.hash, astModule, 'module');
}
