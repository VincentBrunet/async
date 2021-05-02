import { MapArray } from "../../../utils/data/MapArray.ts";

export class OutputCode {
  private header = new MapArray<number, string>();
  private source = new MapArray<number, string>();

  writeToHeader(priority: number, line: string) {
    this.header.push(priority, line);
  }
  writeToSource(priority: number, line: string) {
    this.source.push(priority, line);
  }

  getHeader(): string {
    return this.toContent(this.header);
  }
  getSource(): string {
    return this.toContent(this.source);
  }

  private toContent(container: MapArray<number, string>): string {
    const sortedKeys = [...container.keys()].sort();
    const sortedLines: string[] = [];
    for (const sortedKey of sortedKeys) {
      sortedLines.push((container.list(sortedKey) ?? []).join("\n"));
    }
    return sortedLines.join("\n\n/// SECTION \n\n");
  }
}
