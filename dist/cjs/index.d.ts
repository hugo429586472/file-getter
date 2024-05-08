interface Options {
    useEnv: boolean;
    envSuffix: string;
    filePath?: string;
}
interface Result {
    result: boolean;
    path?: string;
    error?: Error;
}
declare const get_file_path: (fileName: string, options: Options) => Result;
export declare const file_getter: (fileName: string, options: Options) => Result;
export default get_file_path;
//# sourceMappingURL=index.d.ts.map