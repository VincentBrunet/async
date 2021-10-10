import { OutputStatement } from "./OutputStatement.ts";

export interface OutputFunction {
  return: string;
  params: Array<string>;
  statements: Array<OutputStatement>;
}
