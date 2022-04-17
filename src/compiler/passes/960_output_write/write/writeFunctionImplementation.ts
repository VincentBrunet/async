import { OutputFunction, OutputFunctionParam } from '../../../data/output/OutputFunction.ts';
import { Writer } from '../util/Writer.ts';
import { writeBlock } from './writeBlock.ts';

export function writeFunctionImplementation(writer: Writer, outputFunction: OutputFunction) {
  if (!outputFunction.exported) {
    writer.pushToSource('static ');
  }
  writer.pushToSource(outputFunction.type);
  writer.pushToSource(' ');
  writer.pushToSource(outputFunction.name);
  writer.pushToSource('(');
  outputFunction.params.forEach((param: OutputFunctionParam, index: number) => {
    if (index !== 0) {
      writer.pushToSource(', ');
    }
    writer.pushToSource(param.type);
    writer.pushToSource(' ');
    writer.pushToSource(param.name);
  });
  writer.pushToSource(')');
  writeBlock(writer, outputFunction.block, 0);
  writer.pushToSource('\n');
  writer.pushToSource('\n');
}
