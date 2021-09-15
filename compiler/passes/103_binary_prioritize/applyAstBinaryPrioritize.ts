import { AstModule } from "../../data/ast/AstModule.ts";
import { makeRecursor } from "../util/makeRecursor.ts";
import { browseExpressionBinary } from "./browse/browseExpressionBinary.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

const recursor = makeRecursor<BrowsedScope>({
  recurseExpressionBinary: browseExpressionBinary,
});

export function applyAstBinaryPrioritize(astModule: AstModule) {
  recursor.recurseModule(recursor, new BrowsedScope(), astModule);
}
