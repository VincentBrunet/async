import { OutputStruct } from '../../../data/output/OutputStructs.ts';
import { Writer } from '../util/Writer.ts';

export function writeStruct(writer: Writer, outputStruct: OutputStruct) {
  writer.pushToBoth('typedef struct ');
  writer.pushToBoth(outputStruct.name);
  writer.pushToBoth(' ');
  writer.pushToBoth('{');
  writer.pushToBoth('\n');
  for (const field of outputStruct.fields) {
    writer.pushToBoth('  ');
    writer.pushToBoth(field.type);
    writer.pushToBoth(' ');
    writer.pushToBoth(field.name);
    writer.pushToBoth(';');
    writer.pushToBoth('\n');
  }
  writer.pushToBoth('}');
  writer.pushToBoth(' ');
  writer.pushToBoth(outputStruct.name);
  writer.pushToBoth(';');
  writer.pushToBoth('\n');
  writer.pushToBoth('\n');
}
