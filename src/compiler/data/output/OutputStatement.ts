import { OutputBlock } from './OutputBlock.ts';

export interface OutputStatement {
  parts: Array<string>;
  inner?: OutputBlock;
  closed: boolean;
}
