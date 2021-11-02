#!/usr/bin/env node

import * as path from "path";

import {Command} from "commander";
import {ParseCliInput} from "./usecases/parse-cli-input";
import {GenerateClass} from "./usecases/generate-class";

import {SetupCliOptions} from "./usecases/setup-cli-options";
import {ConfigObjectModel, Schema} from "./models/config-object.model";
import {GetSelectedSchema} from "./usecases/get-selected-schema";
import {GenerateUserBasedSpecificSchema} from "./usecases/generate-user-based-specific-schema";
import {GenerateExportFileUsecase as GenerateExportFile} from "./usecases/generate-export-file";


const executionLocal = path.normalize(process.cwd());
const config: ConfigObjectModel = require(path.normalize(path.join(executionLocal, './cleanarch-cli.config.json')));

export const main = async () => {
    const schemas: Schema[] = Array.from(config.schema as Schema[],);


    let cli: Command = new Command();


    cli = await SetupCliOptions.setup(cli, config.commands);
    cli = await ParseCliInput.parse(cli, process.argv);

    const opts = new Map<string, any>(Object.entries(cli.opts()));
    const keys = Array.from(opts.keys());
    const {schema, selectedSchemaKey} = new GetSelectedSchema(keys, schemas).call();


    if (opts.has('updateExports')) {

        let exportFilePath = executionLocal;


        const updateExportPath = opts.get('updateExports');

        if (updateExportPath && typeof updateExportPath === 'string') {
            exportFilePath = path.normalize(path.join(exportFilePath, opts.get('updateExports') as string));
        }

        const generateExportFile = new GenerateExportFile({
            folderPath: exportFilePath,
            exportFilesExtension: config.exportsConfig.extensionType
        });
        await generateExportFile.call();


    } else if (opts.has('all')) {
        const classesBaseName = opts.get('all') as string[];

        for (const classBaseName of classesBaseName) {
            for (const s of schemas) {
                const result = await new GenerateUserBasedSpecificSchema(opts, s, executionLocal, new GenerateClass('', config.lintPreferences), s.sufix, classBaseName, s.abstract).call();

                if(result) {
                    console.log(`[success] file created on: ${s.folder} class ${classBaseName}${s.sufix}`)
                }
            }
        }
    } else if (schema && selectedSchemaKey) {

        let classBaseName = '';

        const keys = Array.from(opts.keys());
        const elementKey = keys.find((key) => key.toUpperCase() == selectedSchemaKey.toUpperCase()) as string;
        classBaseName = (opts.get(elementKey) as string[])[0] as string;
        const result = await new GenerateUserBasedSpecificSchema(opts, schema, executionLocal, new GenerateClass('', config.lintPreferences), selectedSchemaKey, classBaseName, schema.abstract).call();
        if(result) {
            console.log(`[success] file created on: ${schema.folder} class ${classBaseName}${schema.sufix}`)
        }
    }
}

main();
