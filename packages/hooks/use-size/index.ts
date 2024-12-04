import { componentSizes } from '@fz-mini/constants'
import { buildProp } from '@fz-mini/utils'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
})
