import { AstModule } from '../../data/ast/AstModule.ts';
import { makeRecursorPassSimplified } from '../util/makeRecursorPassSimplified.ts';
import { browseStatementImport } from './browse/browseStatementImport.ts';

const pass = makeRecursorPassSimplified({
  recurseStatementImport: browseStatementImport,
});

export function passImportSchedule(url: URL, ast: AstModule) {
  pass(url).recurseModule(ast);
}
