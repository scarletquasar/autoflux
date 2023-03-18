import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { Program } from "./types";

function readAndExecute (identifier: string, args: string[]) {
    const programPath = join("./", identifier, "program.json");
    const programExists = existsSync(programPath);

    if (!programExists) {
        console.error("The specified path doesn't exist.");
        process.exit();
    }
    
    const programRaw = readFileSync(programPath).toString();
    const program = JSON.parse(programRaw) as Program;

    const showHelpCondition = args.length === 0 || (args.length === 1 && args[0] == "--help");
    
    if (showHelpCondition) {
        if (program.help.textEnabled) {
            console.log(program.help.text);
        }

        if (program.help.tipsEnabled) {
            console.log("Commands:\n");
            for(const command of program.commands) {
                let commandText = `Name: ${command.entryPoint}`
                    + ` | Type: ${command.type}`
                    + ` | Example Usage: ${command.exampleUsage}`;

                console.log(commandText);
            }
        }

        return;
    }

    const inputCommand = args[0];

    if (program.commands.find(command => command.entryPoint === inputCommand)) {

    }
    else {
        console.error("The specified command doesn't exist.");
        process.exit();
    }
}

export { readAndExecute }