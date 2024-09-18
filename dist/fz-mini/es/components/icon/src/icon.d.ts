import type { ExtractPropTypes } from 'vue';
import type Icon from './icon.vue';
export declare const iconProps: {
    /**
     * @description icon 尺寸大小
     */
    readonly size: {
        readonly type: import("vue").PropType<string | number>;
    };
    /**
     * @description icon 颜色 svg的填充色
     */
    readonly color: {
        readonly type: StringConstructor;
    };
};
export type IconProps = ExtractPropTypes<typeof iconProps>;
export type IconInstance = InstanceType<typeof Icon>;
