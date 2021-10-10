export class OutputStatement {
  private special = false;
  private parts = new Array<string>();
  markSpecial() {
    this.special = true;
  }
  pushPart(part: string) {
    this.parts.push(part);
  }
  generateParts() {
    return this.parts;
  }
  isSpecial() {
    return this.special;
  }
}
