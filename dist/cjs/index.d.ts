interface Options {
    useEnv: boolean;
    envSuffix: string;
    relativeFileDir?: string;
    sourcePath?: string;
}
interface Result {
    result: boolean;
    path?: string;
    error?: Error;
}
export declare const resolve: (dir: any) => string;
export declare const get_pkg_path: (pkg: any) => string;
export declare const file_getter: (fileName: string, options?: Options) => Result;
declare const _default: {
    get_file_path: (fileName: string, options?: Options) => Result;
    get_pkg_path: (pkg: any) => string;
};
export default _default;
//# sourceMappingURL=index.d.ts.map