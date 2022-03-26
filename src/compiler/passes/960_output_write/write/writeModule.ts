import { UnitModule } from '../../../data/unit/UnitModule.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Writer } from '../util/Writer.ts';
import { writeFunction } from './writeFunction.ts';
import { writeInclude } from './writeInclude.ts';
import { writeStruct } from './writeStruct.ts';

export function writeModule(writer: Writer, unit: UnitModule) {
  const hash = unit.ast.hash;
  const url = unit.url;
  const outputModule = ensure(unit.output);
  // Quick recap of url on top
  writer.pushBoth('//');
  writer.pushBoth(' ');
  writer.pushBoth(url.href);
  writer.pushBoth('\n');
  writer.pushBoth('\n');
  // Anti-reimport
  writer.pushToHeader('#ifndef __');
  writer.pushToHeader(hash);
  writer.pushToHeader('_H');
  writer.pushToHeader('\n');
  writer.pushToHeader('#define __');
  writer.pushToHeader(hash);
  writer.pushToHeader('_H');
  writer.pushToHeader('\n');
  writer.pushToHeader('\n');
  // Quick recap on top
  writer.pushBoth('#include <runtime.h>');
  writer.pushBoth('\n');
  writer.pushBoth('\n');
  // Includes
  if (outputModule.includes.length) {
    for (const outputInclude of outputModule.includes) {
      writeInclude(writer, outputInclude);
    }
    writer.pushBoth('\n');
  }
  // Structs
  if (outputModule.structs.length) {
    for (const outputStruct of outputModule.structs) {
      writeStruct(writer, outputStruct);
    }
    writer.pushToHeader('\n');
  }
  // Functions
  for (const outputFunction of outputModule.functions) {
    writeFunction(writer, outputFunction);
  }
  // Anti-reimport
  writer.pushToHeader('#endif');
  writer.pushToHeader('\n');
}
