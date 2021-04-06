export class OutputCode {
  private header: string[] = [];
  private source: string[] = [];

  writeToHeader(code: string) {
    this.header.push(code);
  }
  writeToSource(code: string) {
    this.source.push(code);
  }

  getHeader(): string {
    return this.header.join("\n");
  }
  getSource(): string {
    return this.source.join("\n");
  }
}
