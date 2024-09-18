export declare const FzIcon: import("fz-mini/es/utils").SFCWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly size: {
        readonly type: import("vue").PropType<string | number>;
    };
    readonly color: {
        readonly type: StringConstructor;
    };
}>, {
    props: import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        readonly size: {
            readonly type: import("vue").PropType<string | number>;
        };
        readonly color: {
            readonly type: StringConstructor;
        };
    }>> & Readonly<{}> & {}>;
    ns: {
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
    style: import("vue").ComputedRef<import("vue").CSSProperties>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly size: {
        readonly type: import("vue").PropType<string | number>;
    };
    readonly color: {
        readonly type: StringConstructor;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>> & Record<string, any>;
export default FzIcon;
export * from './src/icon';
