import { AstBlock } from "../../101_ast/data/AstBlock.ts";

import { OutputCode } from "../util/OutputCode.ts";

import { writeStatement } from "./writeStatement.ts";

export function writeBlock(output: OutputCode, astBlock: AstBlock) {
  for (const statement of astBlock.statements) {
    writeStatement(output, statement);
  }
}
