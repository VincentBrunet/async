export class OutputStatement {
  private parts: string[] = [];
  pushPart(part: string) {
    this.parts.push(part);
  }
  generateParts() {
    return this.parts;
  }
}
