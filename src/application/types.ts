interface Command {
    entryPoint: string;
    instructions: string[];
    type: CommandType;
    exampleUsage: string;
}

type CommandType = "shell" | "ps1-file" | "sh-file" | "js-node-file";

interface Help {
    tipsEnabled: boolean;
    textEnabled: boolean;
    text: string;
}

interface Program {
    commands: Command[];
    help: Help;
    title: string;
}

export { Command, Help, Program, CommandType }