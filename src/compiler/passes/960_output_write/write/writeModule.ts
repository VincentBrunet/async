import { UnitModule } from '../../../data/unit/UnitModule.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Writer } from '../util/Writer.ts';
import { writeFunctionDefinition } from './writeFunctionDefinition.ts';
import { writeFunctionImplementation } from './writeFunctionImplementation.ts';
import { writeStatic } from './writeStatic.ts';
import { writeInclude } from './writeInclude.ts';
import { writeStructDefinition } from './writeStructDefinition.ts';
import { writeStructImplementation } from './writeStructImplementation.ts';

function sectionComment(title: string) {
  return [
    '/**',
    ' * ' + title,
    ' */',
  ].join('\n') + '\n\n';
}

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
  writer.pushToBoth('#include "runtime.hpp"');
  writer.pushToBoth('\n');
  writer.pushToBoth('\n');
  // Includes
  if (outputModule.includes.length) {
    writer.pushToBoth(sectionComment('dependencies'));
    for (const outputInclude of outputModule.includes) {
      writeInclude(writer, outputInclude);
    }
  }
  // Structs definitions
  if (outputModule.structs.length) {
    writer.pushToBoth(sectionComment('structs definitions'));
    for (const outputStruct of outputModule.structs) {
      writeStructDefinition(writer, outputStruct);
    }
  }
  // Functions definitions
  if (outputModule.functions.length) {
    writer.pushToBoth(sectionComment('functions definitions'));
    for (const outputFunction of outputModule.functions) {
      writeFunctionDefinition(writer, outputFunction);
    }
  }
  // Statics
  if (outputModule.statics.length) {
    writer.pushToSource(sectionComment('statics'));
    for (const ouputStatic of outputModule.statics) {
      writeStatic(writer, ouputStatic);
    }
  }
  // Structs implementations
  if (outputModule.structs.length) {
    writer.pushToBoth(sectionComment('structs implementations'));
    for (const outputStruct of outputModule.structs) {
      writeStructImplementation(writer, outputStruct);
    }
  }
  // Functions implementations
  if (outputModule.functions.length) {
    writer.pushToSource(sectionComment('functions implementations'));
    for (const outputFunction of outputModule.functions) {
      writeFunctionImplementation(writer, outputFunction);
    }
  }
  // Anti-reimport
  writer.pushToHeader('#endif');
  writer.pushToHeader('\n');
}
