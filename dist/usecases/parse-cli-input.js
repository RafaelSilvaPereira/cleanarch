"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseCliInput = void 0;
class ParseCliInput {
    constructor(cli) {
        this.cli = cli;
    }
    static async parse(cli, local) {
        return new ParseCliInput(cli).call(local);
    }
    async call(local) {
        return this.cli.parseAsync(local);
    }
}
exports.ParseCliInput = ParseCliInput;
//# sourceMappingURL=parse-cli-input.js.map