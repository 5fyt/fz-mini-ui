import '../../../utils/index.mjs';
import { definePropType } from '../../../utils/vue/props/runtime.mjs';

const iconProps = {
  /**
   * @description icon 尺寸大小
   */
  size: {
    type: definePropType([String, Number])
  },
  /**
   * @description icon 颜色 svg的填充色
   */
  color: {
    type: String
  }
};

export { iconProps };
//# sourceMappingURL=icon.mjs.map
