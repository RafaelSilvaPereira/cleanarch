import {existsSync, mkdirSync, writeFileSync} from "fs";
import {Schema} from "../models/config-object.model";
import {ToKebabCase} from "./convert-string-to-cases";
import {GenerateClass} from "./generate-class";
import * as path from 'path';


export class GenerateUserBasedSpecificSchema {

    constructor(
        readonly opts: Map<string, any>,
        readonly schema: Schema,
        readonly executionLocal: string,
        readonly classGeneratorUtil: GenerateClass,
        readonly key: string,
        readonly classBaseName: string,
        readonly isAbstract: boolean
    ) {
    }

    async call(): Promise<boolean> {

        let classBaseName = '';

        classBaseName = this.classBaseName;

        const decorators = this.schema.useDecorators;
        const imports: string[] = [];
        const useClasses: string[] = [];
        const implementsClasses: string[] = [];

        if (this.opts.has('useSpecifically')) {
            useClasses.push(...this.opts.get('useSpecifically'));
        }


        const defaultDependenciesSuffix = this.schema.defaultDependenciesSuffix

        if (this.opts.has('use')) {
            useClasses.push(...Array.from<string>(this.opts.get('use')).map((className) => `${className}${defaultDependenciesSuffix}`));
        } else if (defaultDependenciesSuffix && defaultDependenciesSuffix.length !== 0) {
            useClasses.push(`${classBaseName}${defaultDependenciesSuffix}`);
        }


        const defaultImplementsSuffix = this.schema.defaultImplementsSuffix;
        if (this.opts.has('implements')) {
            implementsClasses.push(...Array.from<string>(this.opts.get('implements')).map(className => `${className}${defaultImplementsSuffix}`));
        } else if (defaultImplementsSuffix && defaultImplementsSuffix.length !== 0) {
            implementsClasses.push(`${classBaseName}${defaultImplementsSuffix}`);
        }

        const content: string = this.classGeneratorUtil.generate(this.isAbstract, decorators,
            classBaseName + this.key, useClasses, implementsClasses,
            imports, this.schema.defaultMethods);
        const fileName = `/${ToKebabCase(classBaseName)}${this.schema.extensionSufix}${this.schema.languageSufix}`;
        const folderLocal = path.normalize(path.join(this.executionLocal, this.schema.folder));


        if (!existsSync(folderLocal)) {
            mkdirSync(folderLocal, {recursive: true});
        }

        const unormalizedFileLocal = path.join(folderLocal, fileName);
        const creationFileLocal = path.normalize(unormalizedFileLocal);

        writeFileSync(creationFileLocal, content);

        return true;
    }


}
