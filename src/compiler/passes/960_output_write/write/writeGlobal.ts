import { OutputGlobal } from '../../../data/output/OutputGlobal.ts';
import { Writer } from '../util/Writer.ts';

export function writeGlobal(writer: Writer, outputGlobal: OutputGlobal) {
  writer.pushToBoth(outputGlobal.type);
  writer.pushToBoth(' ');
  writer.pushToBoth(outputGlobal.name);
  writer.pushToSource(' = ');
  writer.pushToSource(outputGlobal.value);
  writer.pushToBoth(';');
  writer.pushToBoth('\n');
}
