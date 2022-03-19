import { AstModule } from "../ast/AstModule.ts";
import { CodeModule } from "../code/CodeModule.ts";
import { FilesModule } from "../files/FilesModule.ts";
import { OutputModule } from "../output/OutputModule.ts";
import { TokenModule } from "../token/TokenModule.ts";

export interface UnitModule {
  url: URL;
  token: TokenModule;
  code: CodeModule;
  ast: AstModule;
  output?: OutputModule;
  files?: FilesModule;
}
