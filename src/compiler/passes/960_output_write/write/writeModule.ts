import { UnitModule } from '../../../data/unit/UnitModule.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Writer } from '../util/Writer.ts';
import { writeFunctionDefinition } from './writeFunctionDefinition.ts';
import { writeFunctionImplementation } from './writeFunctionImplementation.ts';
import { writeGlobal } from './writeGlobal.ts';
import { writeInclude } from './writeInclude.ts';
import { writeStruct } from './writeStruct.ts';

export function writeModule(writer: Writer, unit: UnitModule) {
  const hash = unit.ast.hash;
  const url = unit.url;
  const outputModule = ensure(unit.output);
  // Quick recap of url on top
  writer.pushToBoth('//');
  writer.pushToBoth(' ');
  writer.pushToBoth(url.href);
  writer.pushToBoth('\n');
  writer.pushToBoth('\n');
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
  writer.pushToBoth('#include <runtime.h>');
  writer.pushToBoth('\n');
  writer.pushToBoth('\n');
  // Includes
  if (outputModule.includes.length) {
    for (const outputInclude of outputModule.includes) {
      writeInclude(writer, outputInclude);
    }
    writer.pushToBoth('\n');
  }
  // Structs
  if (outputModule.structs.length) {
    for (const outputStruct of outputModule.structs) {
      writeStruct(writer, outputStruct);
    }
    writer.pushToBoth('\n');
  }
  // Globals
  if (outputModule.globals.length) {
    for (const outputGlobal of outputModule.globals) {
      writeGlobal(writer, outputGlobal);
    }
    writer.pushToBoth('\n');
  }
  // Functions definitions
  if (outputModule.functions.length) {
    for (const outputFunction of outputModule.functions) {
      writeFunctionDefinition(writer, outputFunction);
    }
    writer.pushToBoth('\n');
  }
  // Functions implementations
  if (outputModule.functions.length) {
    for (const outputFunction of outputModule.functions) {
      writeFunctionImplementation(writer, outputFunction);
    }
    writer.pushToSource('\n');
  }
  // Anti-reimport
  writer.pushToHeader('#endif');
  writer.pushToHeader('\n');
}
