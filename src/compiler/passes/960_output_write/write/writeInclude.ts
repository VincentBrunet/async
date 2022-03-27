import { OutputInclude } from '../../../data/output/OutputInclude.ts';
import { Writer } from '../util/Writer.ts';

export function writeInclude(writer: Writer, outputInclude: OutputInclude) {
  writer.pushToBoth('#include');
  writer.pushToBoth(' ');
  writer.pushToBoth('<');
  writer.pushToBoth(outputInclude.path);
  writer.pushToBoth('>');
  writer.pushToBoth('\n');
}
