import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { SpawnOptionsWithoutStdio, spawn } from "child_process";
import { Command, Program } from "./types";

class CommandHandler {
    public static readAndExecute (identifier: string, args: string[]) {
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
            this.triggerCommand(command, args.slice(1));
        }
        else {
            console.error("The specified command doesn't exist.");
            process.exit();
        }
    }

    private static triggerCommand(command: Command, args: string[]) {
        const childSpawnOptions: SpawnOptionsWithoutStdio = { stdio: "inherit" } as unknown;
  
        const typeActions = {
          "shell": () => {
            return spawn(
                command.instructions[0], 
                command.instructions.slice(1).concat(args), 
                childSpawnOptions
            );
          },
          "ps1-file": () => {
            return spawn(
                "pwsh", 
                command.instructions.concat(args), 
                childSpawnOptions
            );
          },
          "js-node-file": () => {
            return spawn(
                "node", 
                ["-e"].concat(command.instructions).concat(args), 
                childSpawnOptions
            );
          }
        };
    
        const eventEmitter = typeActions[command.type]();
        eventEmitter.on("data", console.log);
    }
}

export { CommandHandler }