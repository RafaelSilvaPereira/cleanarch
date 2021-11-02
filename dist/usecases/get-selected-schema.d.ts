import { Schema } from "../models/config-object.model";
export declare class GetSelectedSchema {
    readonly keys: string[];
    readonly schemas: Schema[];
    constructor(keys: string[], schemas: Schema[]);
    call(): {
        schema?: Schema;
        selectedSchemaKey?: string;
    };
}
