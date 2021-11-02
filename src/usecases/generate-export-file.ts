import * as fs from 'fs';
import * as path from 'path';


export class GenerateExportFileUsecase {
    constructor(
        readonly setup: {
            folderPath: string,
            exportFilesExtension: string,
        },
    ) { }


    async call(): Promise<void> {
        const dirContent: string[] = fs.readdirSync(this.setup.folderPath);
        const dirName = path.basename(this.setup.folderPath);



        const exportLines: string[] = [];
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
        } else {
            fs.writeFileSync(exportFilePath, exportLines.join(''));
        }
    }




    private async isFile(path: string): Promise<boolean> {


        return fs.statSync(path).isFile();
    }


    private getClassName(fileContent: string): string {
        const response = fileContent.match('class(.*){') ?? fileContent.match('interface(.*){');

        if (response) {
            return response![1].trim();
        } else {
            return '';
        }

    }


    private async getFileContent(path: string): Promise<string> {
        return fs.readFileSync(path, 'utf8');
    }
}
