import { Command } from "commander";

export class ParseCliInput {

    constructor(
        readonly cli: Command
    ) {

    }

    static async parse(cli: Command, local: any): Promise<Command> {
        return new ParseCliInput(cli).call(local);
    }


    async call(local: any): Promise<Command> {
        return this.cli.parseAsync(local);
    }
}