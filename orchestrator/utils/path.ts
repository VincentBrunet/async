import { basename, dirname, fromFileUrl } from "https://deno.land/std@0.92.0/path/posix.ts";

export function prepare(rootMetaUrl: string) {
    const s = rootMetaUrl.replace("file://" + Deno.cwd() + "/", "");
    console.log("s", s)
    console.log("rootMetaUrl", rootMetaUrl)
    const rootMetaFile = fromFileUrl(rootMetaUrl);
    console.log("rootMetaFile", rootMetaFile)
    const rootMetaDir = dirname(rootMetaFile);
    console.log("rootMetaDir", rootMetaDir)
    console.log("Deno.cwd()", Deno.cwd())
    Deno.chdir(rootMetaDir)
}
