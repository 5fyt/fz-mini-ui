import { withInstall, withNoopInstall } from '@fz-mini/utils'
import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'
import type { SFCWithInstall } from '@fz-mini/utils'

export const FzButton: SFCWithInstall<typeof Button> & {
  ButtonGroup: typeof ButtonGroup
} = withInstall(Button, {
  ButtonGroup,
})

export const FzButtonGroup: SFCWithInstall<typeof ButtonGroup> =
  withNoopInstall(ButtonGroup)
export default FzButton

export * from './src/button'
export * from './src/constants'
export type { ButtonInstance, ButtonGroupInstance } from './src/instance'
