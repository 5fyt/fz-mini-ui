'use strict';

require('../../../utils/index.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const iconProps = {
  /**
   * @description icon 尺寸大小
   */
  size: {
    type: runtime.definePropType([String, Number])
  },
  /**
   * @description icon 颜色 svg的填充色
   */
  color: {
    type: String
  }
};

exports.iconProps = iconProps;
//# sourceMappingURL=icon.js.map
