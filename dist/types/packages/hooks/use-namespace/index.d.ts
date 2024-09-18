export declare const useNamespace: (block: string) => {
    b: (blockSuffix?: string) => string;
    e: (element?: string) => void;
    m: (modifier?: string) => void;
    be: (blockSuffix?: string, element?: string) => void;
    em: (element?: string, modifier?: string) => void;
    bm: (blockSuffix?: string, modifier?: string) => void;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => void;
    is: {
        (name: string, state: boolean | undefined): string;
        (name: string): string;
    };
};
