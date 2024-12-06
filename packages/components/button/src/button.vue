<template>
  <component
    :is="tag"
    v-bind="_props"
    ref="_ref"
    :class="buttonKls"
    :style="buttonStyle"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <fz-icon v-else>
        <component :is="loadingIcon" :class="ns.is('loading')" />
      </fz-icon>
    </template>
    <fz-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </fz-icon>
    <span
      v-if="$slots.default"
      :class="{ [ns.em('text', 'expand')]: shouldAddSpace }"
    >
      <slot />
    </span>
  </component>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { FzIcon } from '@fz-mini/components/icon'
import { useNamespace } from '@fz-mini/hooks'
import { buttonEmits, buttonProps } from './button'
import { useButton } from './use-button'
import { useButtonCustomStyle } from './button-custom'

defineOptions({ name: 'FzButton' })
const props = defineProps(buttonProps)
const emits = defineEmits(buttonEmits)

const ns = useNamespace('button')
const { _type, _size, _disabled, _ref, _props, shouldAddSpace, handleClick } =
  useButton(props, emits)

const buttonStyle = useButtonCustomStyle(props)
const buttonKls = computed(() => [
  ns.b(),
  ns.m(_type.value),
  ns.m(_size.value),
  ns.is('disabled', _disabled.value),
  ns.is('plain', props.plain),
  ns.is('loading', props.loading),
  ns.is('round', props.round),
  ns.is('circle', props.circle),
  ns.is('text', props.text),
  ns.is('link', props.link),
  ns.is('has-bg', props.bg),
])

defineExpose({
  /** @description button html element */
  ref: _ref,
  /** @description button size */
  size: _size,
  /** @description button type */
  type: _type,
  /** @description button disabled */
  disabled: _disabled,
  /** @description whether adding space */
  shouldAddSpace,
})
</script>
