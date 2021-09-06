export class OutputStatement {
  private parts = new Array<string>();
  pushPart(part: string) {
    this.parts.push(part);
  }
  generateParts() {
    return this.parts;
  }
}
