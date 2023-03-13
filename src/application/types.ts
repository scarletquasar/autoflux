interface Command {
    entryPoint: string;
    script: string;
    type: CommandType;
    exampleUsage: string;
}

type CommandType = "shell" | "file";

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

export { Command, Help, Program }