import { OutputFunction } from '../../../data/output/OutputFunction.ts';
import { Writer } from '../util/Writer.ts';
import { writeBlock } from './writeBlock.ts';

export function writeFunction(writer: Writer, outputFunction: OutputFunction) {
  // Function definition
  writer.pushBoth(outputFunction.type);
  writer.pushBoth(' ');
  writer.pushBoth(outputFunction.name);
  writer.pushBoth('(');
  for (let i = 0; i < outputFunction.params.length; i++) {
    const param = outputFunction.params[i];
    if (i != 0) {
      writer.pushBoth(', ');
    }
    writer.pushBoth(param.type);
    writer.pushBoth(' ');
    writer.pushBoth(param.name);
  }
  writer.pushBoth(')');
  // Header doesn't have a block
  writer.pushToHeader(';');
  // Source needs the full source
  writeBlock(writer, outputFunction.block, 0);
  // Done
  writer.pushBoth('\n');
  writer.pushBoth('\n');
}
