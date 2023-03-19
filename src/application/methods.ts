import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { SpawnOptionsWithoutStdio, spawn, ChildProcessWithoutNullStreams } from "child_process";
import { Command, Program } from "./types";

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
        handleExecution(command, args.slice(1));
    }
    else {
        console.error("The specified command doesn't exist.");
        process.exit();
    }
}

function handleExecution(command: Command, args: string[]) {
    const childSpawnOptions: SpawnOptionsWithoutStdio = { stdio: "inherit" } as unknown;
    let eventEmitter: ChildProcessWithoutNullStreams;

    switch(command.type) {
        case "shell":
            eventEmitter = spawn(
                command.instructions[0], 
                command.instructions.slice(1).concat(args), 
                childSpawnOptions
            );
            break;
        case "ps1-file":
            eventEmitter = spawn(
                "pwsh", 
                command.instructions.concat(args), 
                childSpawnOptions
            );
            break;
        case "sh-file":
            eventEmitter = spawn(
                "sh", 
                command.instructions.concat(args), 
                childSpawnOptions
            );
            break;
        case "js-node-file":
            eventEmitter = spawn(
                "node", 
                ["-e"].concat(command.instructions).concat(args), 
                childSpawnOptions
            );
            break;
    }

    eventEmitter.on("data", console.log);
}

export { readAndExecute }