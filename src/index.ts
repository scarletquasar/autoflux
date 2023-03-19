import { CommandHandler } from "./application/command-handler";

const args = process.argv.slice(2);

if (args.length) {
    CommandHandler.readAndExecute(args[0], args.slice(1));
}
else {
    console.error("Invalid input, please try again with valid arguments.");
}