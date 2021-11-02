import {Schema} from "../models/config-object.model";

export class GetSelectedSchema {
    constructor(
        readonly keys: string[],
        readonly schemas: Schema[],
    ) {

    }


    call(): { schema?: Schema, selectedSchemaKey?: string } {
        let selectedKey;
        let selectedSchema;
        for (const key of this.keys) {
            for (const schema of this.schemas) {
                if (key.toUpperCase() === schema.sufix.toUpperCase()) {
                    selectedSchema = schema;
                    selectedKey = schema.sufix;

                }
            }
        }
        return {schema: selectedSchema, selectedSchemaKey: selectedKey};
    }
}
