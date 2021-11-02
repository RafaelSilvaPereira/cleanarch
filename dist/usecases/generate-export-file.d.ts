export declare class GenerateExportFileUsecase {
    readonly setup: {
        folderPath: string;
        exportFilesExtension: string;
    };
    constructor(setup: {
        folderPath: string;
        exportFilesExtension: string;
    });
    call(): Promise<void>;
    private isFile;
    private getClassName;
    private getFileContent;
}
