"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateExportFileUsecase = void 0;
const fs = require("fs");
const path = require("path");
class GenerateExportFileUsecase {
    constructor(setup) {
        this.setup = setup;
    }
    async call() {
        const dirContent = fs.readdirSync(this.setup.folderPath);
        const dirName = path.basename(this.setup.folderPath);
        const exportLines = [];
        for (const dirContentName of dirContent) {
            if (dirContentName.endsWith(this.setup.exportFilesExtension)) {
                const filePath = path.normalize(path.join(this.setup.folderPath, `${dirContentName}`));
                const relativeFilePath = path.normalize(path.join('.', dirContentName));
                if (await this.isFile(filePath)) {
                    const fileContent = await this.getFileContent(filePath);
                    const className = await this.getClassName(fileContent);
                    const exportLine = `export { ${className} } from './${relativeFilePath.replace(this.setup.exportFilesExtension, '')}';\n`;
                    exportLines.push(exportLine);
                }
            }
        }
        const exportFilePath = path.normalize(path.join(this.setup.folderPath, `${dirName}.exports${this.setup.exportFilesExtension}`));
        const exportFileExists = fs.existsSync(exportFilePath);
        if (exportFileExists) {
            fs.appendFileSync(exportFilePath, exportLines.join(''));
        }
        else {
            fs.writeFileSync(exportFilePath, exportLines.join(''));
        }
    }
    async isFile(path) {
        return fs.statSync(path).isFile();
    }
    getClassName(fileContent) {
        const response = fileContent.match('class(.*){') ?? fileContent.match('interface(.*){');
        if (response) {
            return response[1].trim();
        }
        else {
            return '';
        }
    }
    async getFileContent(path) {
        return fs.readFileSync(path, 'utf8');
    }
}
exports.GenerateExportFileUsecase = GenerateExportFileUsecase;
//# sourceMappingURL=generate-export-file.js.map