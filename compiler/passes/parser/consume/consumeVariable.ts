import { AstNode } from "../../../data/AstNode.ts";
import { AstNodeType } from "../../../data/AstNodeType.ts";
import { TokenType } from "../../../data/TokenType.ts";
import { ParserState } from "../ParserState.ts";
import { consumeExpression } from "./consumeExpression.ts";
import { consumeType } from "./consumeType.ts";

export function consumeVariable(state: ParserState): AstNode {
  const node: AstNode = {
    type: AstNodeType.Variable,
    children: new Map(),
    metas: new Map(),
  };

  // modifier
  const modifier = state.pop();
  if (modifier.str === "const") {
    node.metas?.set("modifier", "const");
  } else if (modifier.str === "mutable") {
    node.metas?.set("modifier", "mutable");
  } else {
    throw new Error("Invalid variable modifier, got: " + modifier.str);
  }

  // name
  const name = state.pop();
  if (name.type !== TokenType.Identifier) {
    throw new Error("Expected a variable name, got: " + name.str);
  }
  node.metas?.set("name", name.str);

  const op1 = state.peek();
  if (op1.str === "=" || op1.str === ":") {
    
    // value only specified
    if (op1.str === "=") {
      state.consume();
      node.children?.set("type", [
        {
          type: AstNodeType.Type,
        },
      ]);
      node.children?.set("value", [consumeExpression(state)]);

    }
    // type specified
    else if (op1.str === ":") {
      state.consume();
      node.children?.set("type", [consumeType(state)]);

      // value also specified
      const op2 = state.peek();
      if (op2.str === "=") {
        state.consume();
        node.children?.set("value", [consumeExpression(state)]);
      }
    }
  }

  return node;
}
