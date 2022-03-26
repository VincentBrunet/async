import { AstModule } from '../../data/ast/AstModule.ts';
import { makeRecursorPassDfs } from '../util/makeRecursorPassDfs.ts';
import { browseStatementImport } from './browse/browseStatementImport.ts';

const pass = makeRecursorPassDfs({
  recurseStatementImport: browseStatementImport,
});

export function passImportSchedule(url: URL, ast: AstModule) {
  pass(url).recurseModule(ast);
}
