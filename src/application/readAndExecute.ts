import { readFileSync } from "fs";
import { join } from "path";
import { Program } from "./types";

function readAndExecute (identifier: string, args: string[]) {
    const programPath = join("./", identifier, "program.json");
    const programRaw = readFileSync(programPath).toString();
    const program = JSON.parse(programRaw) as Program;

    if (args.length === 1 && args[0] == "--help") {
        if (program.help.textEnabled) {
            console.log(program.help.text);
        }

        if (program.help.tipsEnabled) {
            console.log("Commands:\n");
            for(const command of program.commands) {
                let commandText = 
                    `Name: ${command.entryPoint} | Type: ${command.type} | Example Usage: ${command.exampleUsage}`;

                console.log(commandText);
            }
        }
    }
}

export { readAndExecute }