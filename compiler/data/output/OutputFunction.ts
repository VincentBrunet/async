import { OutputStatement } from "./OutputStatement.ts";

export interface OutputFunction {
  params: Array<string>;
  statements: Array<OutputStatement>;
}
