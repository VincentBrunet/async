import { OutputStruct } from '../../../data/output/OutputStructs.ts';
import { Writer } from '../util/Writer.ts';

function writeStructParts(outputStruct: OutputStruct, write: (part: string) => void) {
  write('struct ');
  write(outputStruct.name);
  if (outputStruct.inherit) {
    write(' ');
    write(':');
    write(' ');
    write(outputStruct.inherit);
  }
  write(' ');
  write('{');
  write('\n');
  for (const field of outputStruct.fields) {
    write('  ');
    write(field.type);
    write(' ');
    write(field.name);
    write(';');
    write('\n');
  }
  write('}');
  write(';');
  write('\n');
  write('\n');
}

export function writeStructImplementation(writer: Writer, outputStruct: OutputStruct) {
  if (outputStruct.exported) {
    writeStructParts(outputStruct, (part: string) => {
      writer.pushToBoth(part);
    });
  } else {
    writeStructParts(outputStruct, (part: string) => {
      writer.pushToSource(part);
    });
  }
}
