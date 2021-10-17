import { FileModule } from "../../../data/file/FileModule.ts";

export class Writer {
  private fileModule: FileModule;

  private contentHeader = new Array<string>();
  private contentSource = new Array<string>();

  constructor(fileModule: FileModule) {
    this.fileModule = fileModule;
  }

  pushToHeader(content: string) {
    this.contentHeader.push(content);
  }
  pushToSource(content: string) {
    this.contentSource.push(content);
  }
  pushBoth(content: string) {
    this.pushToHeader(content);
    this.pushToSource(content);
  }

  async flush() {
    await Deno.writeTextFile(
      this.fileModule.header,
      this.contentHeader.join(""),
    );
    await Deno.writeTextFile(
      this.fileModule.source,
      this.contentSource.join(""),
    );
  }
}
