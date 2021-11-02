import { Command } from "commander";
import { CommandModel } from "../models/config-object.model";



export class SetupCliOptions {
    constructor(
        readonly cli: Command
    ) {
    }

    static async setup(cli: Command, commands: CommandModel[]): Promise<Command> {
        return new SetupCliOptions(cli).call(commands);
    }


    async call(commands: CommandModel[]): Promise<Command> {


        this.cli.option('-all --all <classes...>', 'specify classes');
        this.cli.option('-u --use <classes...>', 'specify classes');
        this.cli.option('-us --useSpecifically <classes...>')
        this.cli.option('-i --implements <classes...>', 'specify classes');
        this.cli.option('-exports --updateExports [path]', 'specify path');

        commands.forEach((e) => {
            this.cli.option(e.command, e.comment);
        });

        return this.cli;
    }
}