import { AstModule } from '../../data/ast/AstModule.ts';
import { makeRecursorPassNaive } from '../util/makeRecursorPassNaive.ts';
import { browseStatementImport } from './browse/browseStatementImport.ts';

const pass = makeRecursorPassNaive({
  recurseStatementImport: browseStatementImport,
});

export function passImportSchedule(url: URL, ast: AstModule) {
  pass(url).recurseModule(ast);
}
