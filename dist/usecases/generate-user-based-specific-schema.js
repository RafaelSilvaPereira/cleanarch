"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateUserBasedSpecificSchema = void 0;
const fs_1 = require("fs");
const convert_string_to_cases_1 = require("./convert-string-to-cases");
const path = require("path");
class GenerateUserBasedSpecificSchema {
    constructor(opts, schema, executionLocal, classGeneratorUtil, key, classBaseName, isAbstract) {
        this.opts = opts;
        this.schema = schema;
        this.executionLocal = executionLocal;
        this.classGeneratorUtil = classGeneratorUtil;
        this.key = key;
        this.classBaseName = classBaseName;
        this.isAbstract = isAbstract;
    }
    async call() {
        let classBaseName = '';
        classBaseName = this.classBaseName;
        const decorators = this.schema.useDecorators;
        const imports = [];
        const useClasses = [];
        const implementsClasses = [];
        if (this.opts.has('useSpecifically')) {
            useClasses.push(...this.opts.get('useSpecifically'));
        }
        const defaultDependenciesSuffix = this.schema.defaultDependenciesSuffix;
        if (this.opts.has('use')) {
            useClasses.push(...Array.from(this.opts.get('use')).map((className) => `${className}${defaultDependenciesSuffix}`));
        }
        else if (defaultDependenciesSuffix && defaultDependenciesSuffix.length !== 0) {
            useClasses.push(`${classBaseName}${defaultDependenciesSuffix}`);
        }
        const defaultImplementsSuffix = this.schema.defaultImplementsSuffix;
        if (this.opts.has('implements')) {
            implementsClasses.push(...Array.from(this.opts.get('implements')).map(className => `${className}${defaultImplementsSuffix}`));
        }
        else if (defaultImplementsSuffix && defaultImplementsSuffix.length !== 0) {
            implementsClasses.push(`${classBaseName}${defaultImplementsSuffix}`);
        }
        const content = this.classGeneratorUtil.generate(this.isAbstract, decorators, classBaseName + this.key, useClasses, implementsClasses, imports, this.schema.defaultMethods);
        const fileName = `/${(0, convert_string_to_cases_1.ToKebabCase)(classBaseName)}${this.schema.extensionSufix}${this.schema.languageSufix}`;
        const folderLocal = path.normalize(path.join(this.executionLocal, this.schema.folder));
        if (!(0, fs_1.existsSync)(folderLocal)) {
            (0, fs_1.mkdirSync)(folderLocal, { recursive: true });
        }
        const unormalizedFileLocal = path.join(folderLocal, fileName);
        const creationFileLocal = path.normalize(unormalizedFileLocal);
        (0, fs_1.writeFileSync)(creationFileLocal, content);
        return true;
    }
}
exports.GenerateUserBasedSpecificSchema = GenerateUserBasedSpecificSchema;
//# sourceMappingURL=generate-user-based-specific-schema.js.map