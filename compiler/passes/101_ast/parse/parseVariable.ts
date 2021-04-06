import { Keyword } from "../../../config/Keyword.ts";
import { TokenType } from "../../001_tokens/data/TokenType.ts";
import { AstVariable } from "../data/AstVariable.ts";
import { TokenStack } from "../util/TokenStack.ts";
import { parseExpression } from "./parseExpression.ts";
import { parseType } from "./parseType.ts";

export function parseVariable(stack: TokenStack): AstVariable | undefined {
  const astVariable: AstVariable = {
    mutable: false,
    name: "????",
  };

  // const/mutable
  const first = stack.peek();
  if (first.str === Keyword.VariableConstant) {
    astVariable.mutable = false;
  } else if (first.str === Keyword.VariableMutable) {
    astVariable.mutable = true;
  } else {
    return undefined;
  }
  stack.consume();

  // name
  const name = stack.peek();
  if (name.type !== TokenType.Identifier) {
    stack.error("Expected an identifier as variable name");
  }
  astVariable.name = name.str;
  stack.consume();

  // type
  const delimType = stack.peek();
  if (delimType.str === ":") {
    stack.consume();
    const astType = stack.parse(parseType);
    if (astType === undefined) {
      stack.error("Expected a type");
    }
    astVariable.type = astType;
  }

  // value
  const delimValue = stack.peek();
  if (delimValue.str === "=") {
    stack.consume();
    const astValue = stack.parse(parseExpression);
    if (astValue === undefined) {
      stack.error("Expected a value");
    }
    astVariable.value = astValue;
  }

  return astVariable;
}
