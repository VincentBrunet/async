import { AstModule } from '../../../data/ast/AstModule.ts';

export function hashGlobalSymbol(
  module: AstModule,
  prefix: string,
) {
  return ['_', module.hash, '_', prefix].join('');
}
