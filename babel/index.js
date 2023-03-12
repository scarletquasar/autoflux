"use strict";

var _fs = require("fs");
var _path = require("path");
var dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
var commandDirectory = (0, _path.join)(dataDirectory, "/autoflux-commands");
var commandDirectoryExists = (0, _fs.existsSync)(commandDirectory);
if (!commandDirectoryExists) {
  (0, _fs.mkdirSync)(commandDirectory);
}
var args = process.argv;
console.log(args);