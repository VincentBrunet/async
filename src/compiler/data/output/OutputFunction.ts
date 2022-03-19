import { OutputBlock } from "./OutputBlock.ts";

export interface OutputFunction {
  type: string;
  name: string;
  params: Array<string>;
  block: OutputBlock;
}
