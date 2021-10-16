export class Writer {
  private pathHeader: string;
  private pathSource: string;

  private contentHeader = new Array<string>();
  private contentSource = new Array<string>();

  constructor(pathHeader: string, pathSource: string) {
    this.pathHeader = pathHeader;
    this.pathSource = pathSource;
  }

  pushToHeader(content: string) {
    this.contentHeader.push(content);
  }
  pushToSource(content: string) {
    this.contentSource.push(content);
  }

  async flush() {
    await Deno.writeTextFile(this.pathHeader, this.contentHeader.join(""));
    await Deno.writeTextFile(this.pathSource, this.contentSource.join(""));
  }
}
