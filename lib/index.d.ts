import type { Context } from '@deepseek-ai/cordis';
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
export interface FileLensListEntry {
    name: string;
    type: string;
    size: number | null;
    path: string;
}
export type FileLensWire = {
    ok: boolean;
    kind?: string;
    message?: string;
    [key: string]: unknown;
};
export declare class FileLensService extends TypertRemoteService {
    static inject: string[];
    private readonly fs;
    private readonly sandboxPolicy;
    private readonly MAX_PREVIEW;
    private readonly MAX_IMAGE;
    private readonly MAX_HEX;
    private readonly MORE_CACHE_MAX;
    private readonly moreCache;
    private readonly activeSearches;
    constructor(ctx: Context);
    private guard;
    private kindOf;
    private errOf;
    private fail;
    private readFrom;
    private cacheMore;
    private dropMore;
    private sessionCwd;
    private defaultRoot;
    private toPlain;
    root(_args: unknown): Promise<{
        root: string | null;
    }>;
    list(args: {
        path?: string;
        root?: string | null;
    }): Promise<FileLensWire>;
    search(args: {
        root?: string | null;
        query?: string | null;
        family?: string | null;
    }): Promise<FileLensWire>;
    grep(args: {
        root?: string | null;
        query?: string | null;
        family?: string | null;
    }): Promise<FileLensWire>;
    read(args: {
        path?: string;
        root?: string | null;
    }): Promise<FileLensWire>;
    readMore(args: {
        path?: string;
        root?: string | null;
        offset?: number | null;
    }): Promise<FileLensWire>;
    readHex(args: {
        path?: string;
        root?: string | null;
    }): Promise<FileLensWire>;
    write(args: {
        path?: string;
        root?: string | null;
        text?: string | null;
        expectedVersion?: string | null;
    }): Promise<FileLensWire>;
    readImage(args: {
        path?: string;
        root?: string | null;
    }): Promise<FileLensWire>;
}
export default FileLensService;
