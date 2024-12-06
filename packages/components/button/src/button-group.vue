<template>
  <div :class="ns.b('group')" />
</template>
<script lang="ts" setup>
import { provide, reactive, toRef } from 'vue'
import { useNamespace } from '@fz-mini/hooks'
import { buttonGropProps } from './button-group'
import { buttonGroupContextKey } from './constants'

const ns = useNamespace('button')
const props = defineProps(buttonGropProps)

provide(
  buttonGroupContextKey,
  reactive({
    size: toRef(props.size),
    type: toRef(props.type),
  })
)
</script>
