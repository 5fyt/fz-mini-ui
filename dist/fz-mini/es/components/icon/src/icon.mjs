import '../../../utils/index.mjs';
import { definePropType } from '../../../utils/vue/props/runtime.mjs';

const iconProps = {
  size: {
    type: definePropType([String, Number])
  },
  color: {
    type: String
  }
};

export { iconProps };
//# sourceMappingURL=icon.mjs.map
