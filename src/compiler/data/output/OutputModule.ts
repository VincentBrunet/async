import { OutputFunction } from './OutputFunction.ts';
import { OutputStatic } from './OutputStatic.ts';
import { OutputInclude } from './OutputInclude.ts';
import { OutputStruct } from './OutputStructs.ts';

export interface OutputModule {
  includes: Array<OutputInclude>;
  functions: Array<OutputFunction>;
  structs: Array<OutputStruct>;
  statics: Array<OutputStatic>;
}
