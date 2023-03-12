import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const dataDirectory = process.env.APPDATA || (
    process.platform == 'darwin' ? 
    process.env.HOME + '/Library/Preferences' :
    process.env.HOME + "/.local/share");

const commandDirectory = join(dataDirectory, "/autoflux-commands");
const commandDirectoryExists = existsSync(commandDirectory);

if (!commandDirectoryExists) {
    mkdirSync(commandDirectory);
}

const args = process.argv;

console.log(args);