<template>
  <i :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
import { iconProps } from './icon'
import { useNamespace } from '@fz-mini/hooks'
import { addUnit, isUndefined } from '@fz-mini/utils'
defineOptions({
  name: 'FzIcon',
})
const props = defineProps(iconProps)
const ns = useNamespace('icon')
const style = computed<CSSProperties>(() => {
  const { size, color } = props
  if (!size && !color) return {}
  return {
    fontSize: isUndefined(size) ? undefined : addUnit(size),
    '--color': color,
  }
})
</script>
