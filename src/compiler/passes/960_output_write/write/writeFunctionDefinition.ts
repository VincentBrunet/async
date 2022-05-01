import { OutputFunction } from '../../../data/output/OutputFunction.ts';
import { Writer } from '../util/Writer.ts';

function writeFunctionDefinitionParts(outputFunction: OutputFunction, write: (part: string) => void) {
  if (!outputFunction.exported) {
    write('static ');
  }
  write(outputFunction.type);
  write(' ');
  write(outputFunction.name);
  write('(');
  for (let i = 0; i < outputFunction.params.length; i++) {
    const param = outputFunction.params[i];
    if (i !== 0) {
      write(',');
    }
    write('\n');
    write('  ');
    write(param.type);
    write(' ');
    write(param.name);
  }
  write('\n)');
  write(';');
  write('\n');
  write('\n');
}

export function writeFunctionDefinition(writer: Writer, outputFunction: OutputFunction) {
  if (outputFunction.exported) {
    writeFunctionDefinitionParts(outputFunction, (part: string) => {
      writer.pushToBoth(part);
    });
  } else {
    writeFunctionDefinitionParts(outputFunction, (part: string) => {
      writer.pushToSource(part);
    });
  }
}
