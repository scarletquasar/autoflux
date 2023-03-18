import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { SpawnOptionsWithoutStdio, spawnSync } from "child_process";
import { CommandType, Program } from "./types";

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
    const command = program.commands.find(command => command.entryPoint === inputCommand);
    if (command) {
        handleExecution(command.instructions, args.slice(1), command.type);
    }
    else {
        console.error("The specified command doesn't exist.");
        process.exit();
    }
}

function handleExecution(instructions: string[], args: string[], type: CommandType) {
    const childSpawnOptions: SpawnOptionsWithoutStdio = { stdio: "inherit" } as unknown;

    switch(type) {
        case "shell":
            spawnSync(
                instructions[0], 
                instructions.slice(1).concat(args), 
                childSpawnOptions
            );
            break;
        case "ps1-file":
            spawnSync(
                "pwsh", 
                instructions.concat(args), 
                childSpawnOptions
            );
            break;
        case "sh-file":
            spawnSync(
                "sh", 
                instructions.concat(args), 
                childSpawnOptions
            );
            break;
        case "js-node-file":
            spawnSync(
                "node", 
                ["-e"].concat(instructions).concat(args), 
                childSpawnOptions
            );
            break;
    }
}

export { readAndExecute }