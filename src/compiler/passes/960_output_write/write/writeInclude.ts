import { OutputInclude } from "../../../data/output/OutputInclude.ts";
import { Writer } from "../util/Writer.ts";

export function writeInclude(writer: Writer, outputInclude: OutputInclude) {
  writer.pushBoth("#include");
  writer.pushBoth(" ");
  writer.pushBoth("<");
  writer.pushBoth(outputInclude.path);
  writer.pushBoth(">");
  writer.pushBoth("\n");
}
