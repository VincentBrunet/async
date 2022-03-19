import { OutputStruct } from "../../../data/output/OutputStructs.ts";
import { Writer } from "../util/Writer.ts";

export function writeStruct(writer: Writer, outputStruct: OutputStruct) {
  writer.pushToHeader("typedef struct ");
  writer.pushToHeader(outputStruct.name);
  writer.pushToHeader(" ");
  writer.pushToHeader("{");
  writer.pushToHeader("\n");
  for (const field of outputStruct.fields) {
    writer.pushToHeader("  ");
    writer.pushToHeader(field.type);
    writer.pushToHeader("  ");
    writer.pushToHeader(field.name);
    writer.pushToHeader(";");
    writer.pushToHeader("\n");
  }
  writer.pushToHeader("}");
  writer.pushToHeader(" ");
  writer.pushToHeader(outputStruct.name);
  writer.pushToHeader(";");
  writer.pushToHeader("\n");
  writer.pushToHeader("\n");
}
