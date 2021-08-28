import { MapArray } from "../../../utils/data/MapArray.ts";

export class OutputCode {
  private header = new MapArray<OutputSection, string>();
  private source = new MapArray<OutputSection, string>();

  private _id = 0;

  private functions = new MapArray<string, string>();

  pushFunction() {
    const id = _id++;
  }
  popFunction() {
  }

  writeToHeader(section: OutputSection, line: string) {
    this.header.push(section, line);
  }
  writeToSource(section: OutputSection, line: string) {
    this.source.push(section, line);
  }

  getHeader(): string {
    return this.toContent(this.header);
  }
  getSource(): string {
    return this.toContent(this.source);
  }

  private toContent(container: MapArray<OutputSection, string>): string {
    const sortedKeys = [...container.keys()].sort();
    const sortedLines: string[] = [];
    for (const sortedKey of sortedKeys) {
      sortedLines.push("");
      sortedLines.push("/// SECTION - " + sortedKey);
      sortedLines.push("");
      for (const line of container.list(sortedKey) ?? []) {
        sortedLines.push(line);
      }
    }
    return sortedLines.join("\n");
  }
}
