import { OutputFunction } from "./OutputFunction.ts";
import { OutputInclude } from "./OutputInclude.ts";

export interface OutputModule {
  includes: Array<OutputInclude>;
  functions: Array<OutputFunction>;
}
