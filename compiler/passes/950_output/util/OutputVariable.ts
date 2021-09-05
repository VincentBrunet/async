import { hash } from "../../../utils/strings/hash.ts";

export class OutputVariable {
  private hash: number;
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.hash = hash(name);
  }

  getName() {
    return this.name;
  }
  getHash() {
    return this.hash;
  }
}
