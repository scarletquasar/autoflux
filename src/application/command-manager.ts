const APP_FOLDER = process.env.APPDATA || 
    (process.platform == 'darwin' 
    ? process.env.HOME + '/Library/Preferences' 
    : process.env.HOME + "/.local/share");

class CommandManager {
    saveAlias(alias: string, path: string) {

    }

    private readAliasFile() {
        
    }

    private createAliasFile() {

    }
}