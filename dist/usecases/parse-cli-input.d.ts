import { Command } from "commander";
export declare class ParseCliInput {
    readonly cli: Command;
    constructor(cli: Command);
    static parse(cli: Command, local: any): Promise<Command>;
    call(local: any): Promise<Command>;
}
