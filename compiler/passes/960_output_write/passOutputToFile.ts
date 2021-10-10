import { OutputModule } from "../../data/output/OutputModule.ts";
import { writeModule } from "./browse/writeModule.ts";

export async function passOutputToFile(outputModule: OutputModule) {
  writeModule(outputModule);
}
