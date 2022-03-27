import { OutputStatic } from '../../../data/output/OutputStatic.ts';
import { Writer } from '../util/Writer.ts';

export function writeStatic(writer: Writer, outputStatic: OutputStatic) {
  writer.pushToSource('static ');
  writer.pushToSource(outputStatic.type);
  writer.pushToSource(' ');
  writer.pushToSource(outputStatic.name);
  writer.pushToSource(' = ');
  writer.pushToSource(outputStatic.value);
  writer.pushToSource(';');
  writer.pushToSource('\n');
  writer.pushToSource('\n');
}
