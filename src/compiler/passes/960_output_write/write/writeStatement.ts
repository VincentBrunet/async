import { OutputStatement } from '../../../data/output/OutputStatement.ts';
import { repeat } from '../../../lib/core/strings/repeat.ts';
import { Writer } from '../util/Writer.ts';
import { writeBlock } from './writeBlock.ts';

export function writeStatement(
  writer: Writer,
  outputStatement: OutputStatement,
  depth: number,
) {
  writer.pushToSource(repeat('  ', depth));
  if (outputStatement.parts.length > 0) {
    writer.pushToSource(outputStatement.parts.join(''));
  }
  if (outputStatement.inner) {
    writeBlock(writer, outputStatement.inner, depth);
  } else {
    if (outputStatement.parts.length > 0) {
      writer.pushToSource(';');
    }
  }
  writer.pushToSource('\n');
}
