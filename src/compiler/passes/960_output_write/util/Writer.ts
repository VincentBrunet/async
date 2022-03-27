import { FilesModule } from "../../../data/files/FilesModule.ts";

export class Writer {
  private filesModule: FilesModule;

  private contentHeader = new Array<string>();
  private contentSource = new Array<string>();

  constructor(filesModule: FilesModule) {
    this.filesModule = filesModule;
  }

  pushToHeader(content: string) {
    this.contentHeader.push(content);
  }
  pushToSource(content: string) {
    this.contentSource.push(content);
  }
  pushToBoth(content: string) {
    this.pushToHeader(content);
    this.pushToSource(content);
  }

  async flush() {
    await Deno.writeTextFile(
      this.filesModule.header,
      this.contentHeader.join(""),
    );
    await Deno.writeTextFile(
      this.filesModule.source,
      this.contentSource.join(""),
    );
  }
}
