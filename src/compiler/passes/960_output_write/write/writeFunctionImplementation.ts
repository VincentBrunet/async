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
  const params = outputFunction.params;
  for (let i = 0; i < params.length; i++) {
    const param: OutputFunctionParam = params[i];
    if (i !== 0) {
      writer.pushToSource(',');
    }
    writer.pushToSource('\n');
    writer.pushToSource('  ');
    writer.pushToSource(param.type);
    writer.pushToSource(' ');
    writer.pushToSource(param.name);
  }
  writer.pushToSource('\n)');
  writer.pushToSource(' ');
  //writer.pushToSource(`{\nprintf(\"function start: %s\\n", "${outputFunction.name}");\n`);
  writeBlock(writer, outputFunction.block, 0);
  //writer.pushToSource(`\nprintf(\"function start: %s\\n", "${outputFunction.name}");\n}`);
  writer.pushToSource('\n');
  writer.pushToSource('\n');
}
