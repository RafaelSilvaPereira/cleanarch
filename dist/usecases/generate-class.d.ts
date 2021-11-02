import { LintPreferenceModel } from "../models/config-object.model";
export declare class GenerateClass {
    data: string;
    lintPreferences: LintPreferenceModel;
    constructor(data: string, lintPreferences: LintPreferenceModel);
    insertDecorator(decorators: string[]): GenerateClass;
    implementsSomething(something: string[]): GenerateClass;
    breakLine(): GenerateClass;
    openBrackets(): GenerateClass;
    closeBrackets(): GenerateClass;
    declareClass(isAbstract: boolean, name: string): GenerateClass;
    declareInterface(name: string): GenerateClass;
    useSomething(something: string[]): GenerateClass;
    useNone(): GenerateClass;
    generate(isAbstract: boolean, decorators: string[], classBaseName: string, usesClasses: string[], implementsClasses: string[], imports: string[], defaultMethods: string[]): string;
    lineEnd(): string;
}
