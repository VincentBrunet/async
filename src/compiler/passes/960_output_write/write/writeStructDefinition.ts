import { OutputStruct } from '../../../data/output/OutputStructs.ts';
import { Writer } from '../util/Writer.ts';

function writeStructParts(outputStruct: OutputStruct, write: (part: string) => void) {
  write('struct ');
  write(outputStruct.name);
  write(';');
  write('\n');
  write('\n');
}

export function writeStructDefinition(writer: Writer, outputStruct: OutputStruct) {
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
