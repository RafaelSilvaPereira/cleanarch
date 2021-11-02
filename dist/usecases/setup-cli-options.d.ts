import { Command } from "commander";
import { CommandModel } from "../models/config-object.model";
export declare class SetupCliOptions {
    readonly cli: Command;
    constructor(cli: Command);
    static setup(cli: Command, commands: CommandModel[]): Promise<Command>;
    call(commands: CommandModel[]): Promise<Command>;
}
