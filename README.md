# 🧩 autoflux
 
**autoflux** is a cross-platform tool for assembling scripts, commands and automation stuff into a documentable and maintainable fully posix compliant command line interface.

> **Warning**
> Autoflux is still in development

## How does it work?

In **autoflux**, commands are folders containing an index file, called `program.json`, that file will follow a schema that can be used to assemble scripts and commands. To start using the project you just need to create a folder, create the index file and put all the needed files in order to assemble then in a single command line tool.


![Sem título-2023-03-03-1919](https://user-images.githubusercontent.com/70824102/226153343-1d38c34a-c304-4c71-9e3b-05a0aad16a08.svg)

## Why use autoflux?

- **Reliability:** POSIX-compliant command line tools ready to use and they cover all your needed scripts and have options to provide proper documentation to it (that comes embedded in runtime)
- **Portability:** autoflux commands can be easily shared with the respective associated folders, this can be used for personal automation, open source projects and even be scaled to company projects where you need to do things like set up development environments for newcomers with some needed scripts
- **Cross-platform:** Since autoflux is made using TypeScript on top of Node.js, it can be used in any supported platform (like Unix, FreeBSD, Windows, macOS...)

## Todo

- [x] Folder command feature: Create commands using indexed folders that contains all the logic and resources;
- [] Command-save: save a command path globally and call it directly with the alias