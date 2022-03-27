import { OutputFunction } from '../../../data/output/OutputFunction.ts';
import { Writer } from '../util/Writer.ts';

export function writeFunctionDefinition(writer: Writer, outputFunction: OutputFunction) {
  writer.pushToBoth(outputFunction.type);
  writer.pushToBoth(' ');
  writer.pushToBoth(outputFunction.name);
  writer.pushToBoth('(');
  for (let i = 0; i < outputFunction.params.length; i++) {
    const param = outputFunction.params[i];
    if (i != 0) {
      writer.pushToBoth(', ');
    }
    writer.pushToBoth(param.type);
    writer.pushToBoth(' ');
    writer.pushToBoth(param.name);
  }
  writer.pushToBoth(')');
  writer.pushToBoth(';');
  writer.pushToBoth('\n');
  writer.pushToBoth('\n');
}
