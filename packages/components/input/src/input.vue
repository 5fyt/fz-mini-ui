<template>
  <div>
    <!-- input -->
    <div v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend">
        <slot name="prepend" />
      </div>
      <div class="wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix || prefixIcon">
          <slot name="prefix" />
          <fz-icon v-if="prefixIcon">
            <component :is="prefixIcon" />
          </fz-icon>
        </span>

        <input />
        <!-- suffix slot -->
        <span v-if="suffixVisible">
          <span>
            <template
              v-if="!showClear || !showPwdVisible || !isWordLimitVisible"
            >
              <slot name="suffix" />
              <fz-icon v-if="suffixIcon">
                <component :is="suffixIcon" />
              </fz-icon>
            </template>
            <fz-icon v-if="showClear">
              <Close />
            </fz-icon>
            <fz-icon v-if="showPwdVisible">
              <component :is="passwordIcon" />
            </fz-icon>
            <span v-if="isWordLimitVisible">
              <span>
                {{ textLength / maxlength }}
              </span>
            </span>
          </span>
        </span>
      </div>
      <!-- append slot -->
      <div v-if="slots.prepend">
        <slot name="append" />
      </div>
    </div>
    <div v-else>
      <textarea />
      <span v-if="isWordLimitVisible">
        {{ textLength / maxlength }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import {
  Close,
  EyeOffOutline as IconHide,
  EyeSharp as IconView,
} from '@vicons/ionicons5'
import { isNil } from 'lodash-unified'
import { FzIcon } from '@fz-mini/fz-mini'
import { inputProps } from './input'
const passwordVisible = ref(false)
const props = defineProps(inputProps)
const slots = useSlots()
const passwordIcon = computed(() =>
  passwordVisible.value ? IconView : IconHide
)
const showClear = computed(() => props.clearable)
const showPwdVisible = computed(() => props.showPassword)
const isWordLimitVisible = computed(() => props.showWordLimit)
const suffixVisible = computed(() => !!slots.suffix || !!props.suffixIcon)
const nativeInputValue = computed(() =>
  isNil(props.modelValue) ? '' : String(props.modelValue)
)
const textLength = computed(() => nativeInputValue.value.length)
</script>
