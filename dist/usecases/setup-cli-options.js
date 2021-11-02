"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupCliOptions = void 0;
class SetupCliOptions {
    constructor(cli) {
        this.cli = cli;
    }
    static async setup(cli, commands) {
        return new SetupCliOptions(cli).call(commands);
    }
    async call(commands) {
        this.cli.option('-all --all <classes...>', 'specify classes');
        this.cli.option('-u --use <classes...>', 'specify classes');
        this.cli.option('-us --useSpecifically <classes...>');
        this.cli.option('-i --implements <classes...>', 'specify classes');
        this.cli.option('-exports --updateExports [path]', 'specify path');
        commands.forEach((e) => {
            this.cli.option(e.command, e.comment);
        });
        return this.cli;
    }
}
exports.SetupCliOptions = SetupCliOptions;
//# sourceMappingURL=setup-cli-options.js.map