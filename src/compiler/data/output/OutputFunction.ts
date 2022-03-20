import { OutputBlock } from './OutputBlock.ts';

export interface OutputFunctionParam {
  type: string;
  name: string;
}

export interface OutputFunction {
  type: string;
  name: string;
  params: Array<OutputFunctionParam>;
  block: OutputBlock;
}
