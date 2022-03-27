import { OutputFunction } from '../../../data/output/OutputFunction.ts';
import { Writer } from '../util/Writer.ts';
import { writeBlock } from './writeBlock.ts';

export function writeFunctionImplementation(writer: Writer, outputFunction: OutputFunction) {
  writer.pushToSource(outputFunction.type);
  writer.pushToSource(' ');
  writer.pushToSource(outputFunction.name);
  writer.pushToSource('(');
  for (let i = 0; i < outputFunction.params.length; i++) {
    const param = outputFunction.params[i];
    if (i != 0) {
      writer.pushToSource(', ');
    }
    writer.pushToSource(param.type);
    writer.pushToSource(' ');
    writer.pushToSource(param.name);
  }
  writer.pushToSource(')');
  writeBlock(writer, outputFunction.block, 0);
  writer.pushToSource('\n');
  writer.pushToSource('\n');
}
