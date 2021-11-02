"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSelectedSchema = void 0;
class GetSelectedSchema {
    constructor(keys, schemas) {
        this.keys = keys;
        this.schemas = schemas;
    }
    call() {
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
        return { schema: selectedSchema, selectedSchemaKey: selectedKey };
    }
}
exports.GetSelectedSchema = GetSelectedSchema;
//# sourceMappingURL=get-selected-schema.js.map