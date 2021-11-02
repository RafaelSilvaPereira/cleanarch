export interface ConfigObjectModel {
    commands: CommandModel[];
    schema: Schema[];
    exportsConfig: ExportConfig;
    lintPreferences: LintPreferenceModel;
}
export interface LintPreferenceModel {
    useSemicolon: boolean;
}
export interface CommandModel {
    command: string;
    comment: string;
}
export interface Schema {
    sufix: string;
    extensionSufix: string;
    languageSufix: string;
    defaultImplementsSuffix: string;
    defaultDependenciesSuffix: string;
    folder: string;
    abstract: boolean;
    useDecorators: string[];
    defaultMethods: string[];
}
export interface ExportConfig {
    extensionType: string;
}
