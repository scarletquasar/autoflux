import { readAndExecute } from "./application/readAndExecute";

const args = process.argv.slice(2);

if (args.length > 0) {
    readAndExecute(args[0], args.slice(1));
}