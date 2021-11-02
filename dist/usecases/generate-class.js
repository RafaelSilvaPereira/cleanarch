"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateClass = void 0;
const convert_string_to_cases_1 = require("./convert-string-to-cases");
class GenerateClass {
    constructor(data, lintPreferences) {
        this.data = data;
        this.lintPreferences = lintPreferences;
    }
    insertDecorator(decorators) {
        const length = decorators.length;
        for (let i = 0; i < length; i++) {
            const element = decorators[i];
            this.data += element;
            if (i < length - 1) {
                this.data += '\n';
            }
        }
        return this;
    }
    implementsSomething(something) {
        const message = ` implements ` + something.reduce((acc, current) => `${acc}, ${current}`);
        this.data += message;
        return this;
    }
    breakLine() {
        this.data += '\n';
        return this;
    }
    openBrackets() {
        this.data += ' {';
        return this;
    }
    closeBrackets() {
        this.data += '}';
        return this;
    }
    declareClass(isAbstract, name) {
        this.data += '\n';
        if (isAbstract) {
            this.data += `export abstract class ${name}`;
        }
        else {
            this.data += `export class ${name}`;
        }
        return this;
    }
    declareInterface(name) {
        this.data += '\n' + `export interface ${name}`;
        return this;
    }
    useSomething(something) {
        let fields = '  constructor(';
        const length = something.length;
        for (let i = 0; i < length; i++) {
            const element = something[i];
            fields += `private readonly ${(0, convert_string_to_cases_1.ToCamelCase)(element)}: ${element}`;
            if (i < length - 1) {
                fields += ', ';
            }
        }
        fields += ') { }';
        this.data += fields;
        return this;
    }
    useNone() {
        this.data += '  constructor() { }';
        return this;
    }
    generate(isAbstract, decorators, classBaseName, usesClasses, implementsClasses, imports, defaultMethods) {
        this
            .insertDecorator(decorators)
            .declareClass(isAbstract, classBaseName);
        if (implementsClasses && implementsClasses.length != 0) {
            this
                .implementsSomething(implementsClasses)
                .openBrackets()
                .breakLine();
        }
        else {
            this
                .openBrackets()
                .breakLine();
        }
        if (usesClasses && usesClasses.length !== 0) {
            this
                .useSomething(usesClasses)
                .breakLine();
        }
        this.breakLine();
        if (defaultMethods && defaultMethods.length !== 0) {
            this.data += defaultMethods.map(m => '  ' + m).join('\n') + '\n';
        }
        this.breakLine().closeBrackets();
        return this.data;
    }
    lineEnd() {
        return this.lintPreferences.useSemicolon ? ';' : '';
    }
}
exports.GenerateClass = GenerateClass;
//# sourceMappingURL=generate-class.js.map