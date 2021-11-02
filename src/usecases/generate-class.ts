import {ToCamelCase} from "./convert-string-to-cases";
import {LintPreferenceModel} from "../models/config-object.model";


export class GenerateClass {


    constructor(
        public data: string,
        public lintPreferences: LintPreferenceModel
    ) {
    }

    insertDecorator(decorators: string[]): GenerateClass {


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

    implementsSomething(something: string[]): GenerateClass {
        const message = ` implements ` + something.reduce((acc, current) => `${acc}, ${current}`);
        this.data += message;
        return this
    }

    breakLine(): GenerateClass {
        this.data += '\n';
        return this;
    }

    openBrackets(): GenerateClass {
        this.data += ' {';
        return this;
    }

    closeBrackets(): GenerateClass {
        this.data += '}';
        return this;
    }

    declareClass(isAbstract: boolean, name: string): GenerateClass {

        this.data += '\n';


        if (isAbstract) {
            this.data += `export abstract class ${name}`;
        } else {
            this.data += `export class ${name}`;
        }
        return this;
    }

    declareInterface(name: string): GenerateClass {
        this.data += '\n' + `export interface ${name}`;
        return this;
    }

    useSomething(something: string[]): GenerateClass {

        let fields = '  constructor(';

        const length = something.length;
        for (let i = 0; i < length; i++) {
            const element = something[i];
            fields += `private readonly ${ToCamelCase(element)}: ${element}`;
            if (i < length - 1) {
                fields += ', ';
            }
        }

        fields += ') { }';

        this.data += fields;
        return this;
    }

    useNone(): GenerateClass {
        this.data += '  constructor() { }';
        return this;
    }


    generate(isAbstract: boolean, decorators: string[], classBaseName: string, usesClasses: string[],
             implementsClasses: string[], imports: string[], defaultMethods: string[]): string {
        this
            .insertDecorator(decorators)
            .declareClass(isAbstract, classBaseName)
        if (implementsClasses && implementsClasses.length != 0) {
            this
                .implementsSomething(implementsClasses)
                .openBrackets()
                .breakLine()
            ;
        } else {
            this
                .openBrackets()
                .breakLine();
        }

        if (usesClasses && usesClasses.length !== 0) {
            this
                .useSomething(usesClasses)
                .breakLine();
        }

        this.breakLine()

        if (defaultMethods && defaultMethods.length !== 0) {
            this.data += defaultMethods.map(m => '  ' + m).join('\n') + '\n';
        }
        this.breakLine().closeBrackets();
        return this.data;
    }

    lineEnd(): string {
        return this.lintPreferences.useSemicolon ? ';' : '';
    }

}
