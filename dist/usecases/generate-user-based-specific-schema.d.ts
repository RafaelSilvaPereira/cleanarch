import { Schema } from "../models/config-object.model";
import { GenerateClass } from "./generate-class";
export declare class GenerateUserBasedSpecificSchema {
    readonly opts: Map<string, any>;
    readonly schema: Schema;
    readonly executionLocal: string;
    readonly classGeneratorUtil: GenerateClass;
    readonly key: string;
    readonly classBaseName: string;
    readonly isAbstract: boolean;
    constructor(opts: Map<string, any>, schema: Schema, executionLocal: string, classGeneratorUtil: GenerateClass, key: string, classBaseName: string, isAbstract: boolean);
    call(): Promise<boolean>;
}
