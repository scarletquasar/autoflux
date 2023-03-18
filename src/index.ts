import { readAndExecute } from "./application/methods";

const args = process.argv.slice(2);

if (args.length > 0) {
    readAndExecute(args[0], args.slice(1));
}