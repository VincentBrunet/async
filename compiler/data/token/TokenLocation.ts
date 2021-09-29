import { Range } from "../util/Range.ts";

export interface TokenLocation {
  index: Range;
  column: Range;
  line: Range;
}
