import { OutputModule } from "../output/OutputModule.ts";

export interface FileModule {
  sourceOutput: OutputModule;

  header: string;
  source: string;
  object: string;
  meta: string;
}
