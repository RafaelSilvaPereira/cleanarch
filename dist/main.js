#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const path = require("path");
const commander_1 = require("commander");
const parse_cli_input_1 = require("./usecases/parse-cli-input");
const generate_class_1 = require("./usecases/generate-class");
const setup_cli_options_1 = require("./usecases/setup-cli-options");
const get_selected_schema_1 = require("./usecases/get-selected-schema");
const generate_user_based_specific_schema_1 = require("./usecases/generate-user-based-specific-schema");
const generate_export_file_1 = require("./usecases/generate-export-file");
const executionLocal = path.normalize(process.cwd());
const config = require(path.normalize(path.join(executionLocal, './cleanarch-cli.config.json')));
const main = async () => {
    const schemas = Array.from(config.schema);
    let cli = new commander_1.Command();
    cli = await setup_cli_options_1.SetupCliOptions.setup(cli, config.commands);
    cli = await parse_cli_input_1.ParseCliInput.parse(cli, process.argv);
    const opts = new Map(Object.entries(cli.opts()));
    const keys = Array.from(opts.keys());
    const { schema, selectedSchemaKey } = new get_selected_schema_1.GetSelectedSchema(keys, schemas).call();
    if (opts.has('updateExports')) {
        let exportFilePath = executionLocal;
        const updateExportPath = opts.get('updateExports');
        if (updateExportPath && typeof updateExportPath === 'string') {
            exportFilePath = path.normalize(path.join(exportFilePath, opts.get('updateExports')));
        }
        const generateExportFile = new generate_export_file_1.GenerateExportFileUsecase({
            folderPath: exportFilePath,
            exportFilesExtension: config.exportsConfig.extensionType
        });
        await generateExportFile.call();
    }
    else if (opts.has('all')) {
        const classesBaseName = opts.get('all');
        for (const classBaseName of classesBaseName) {
            for (const s of schemas) {
                const result = await new generate_user_based_specific_schema_1.GenerateUserBasedSpecificSchema(opts, s, executionLocal, new generate_class_1.GenerateClass('', config.lintPreferences), s.sufix, classBaseName, s.abstract).call();
                if (result) {
                    console.log(`[success] file created on: ${s.folder} class ${classBaseName}${s.sufix}`);
                }
            }
        }
    }
    else if (schema && selectedSchemaKey) {
        let classBaseName = '';
        const keys = Array.from(opts.keys());
        const elementKey = keys.find((key) => key.toUpperCase() == selectedSchemaKey.toUpperCase());
        classBaseName = opts.get(elementKey)[0];
        const result = await new generate_user_based_specific_schema_1.GenerateUserBasedSpecificSchema(opts, schema, executionLocal, new generate_class_1.GenerateClass('', config.lintPreferences), selectedSchemaKey, classBaseName, schema.abstract).call();
        if (result) {
            console.log(`[success] file created on: ${schema.folder} class ${classBaseName}${schema.sufix}`);
        }
    }
};
exports.main = main;
(0, exports.main)();
//# sourceMappingURL=main.js.map