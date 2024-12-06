import { type SetupContext, computed, inject, ref, useSlots } from 'vue'
import { buttonGroupContextKey } from './constants'
import type { ButtonEmits, ButtonProps } from './button'

export const useButton = (
  props: ButtonProps,
  emits: SetupContext<ButtonEmits>['emit']
) => {
  const slots = useSlots()
  const buttonGroupContext = inject(buttonGroupContextKey, undefined)
  const _type = computed(() => props.type || buttonGroupContext?.type || '')
  const _size = computed(() => props.size || buttonGroupContext?.size || '')
  const _disabled = computed(() => props.disabled || false)
  const autoInsertSpace = computed(() => props.autoInsertSpace ?? false)
  const _ref = ref<HTMLButtonElement>()

  const _props = computed(() => {
    if (props.tag === 'button') {
      return {
        ariaDisabled: _disabled.value,
        disabled: _disabled.value,
        type: props.nativeType,
        autofocus: props.autofocus,
      }
    }
    return {}
  })
  const shouldAddSpace = computed(() => {
    const defaultSlot = slots.default?.()
    if (autoInsertSpace.value && defaultSlot?.length === 1) {
      const slot = defaultSlot[0]
      if (slot.type === 'text') {
        const text = slot.children as string
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim())
      }
    }
    return false
  })

  const handleClick = (evt: MouseEvent) => {
    if (_disabled.value || props.loading) {
      evt.stopPropagation()
    }
    emits('click', evt)
  }
  return {
    _type,
    _size,
    _disabled,
    _ref,
    _props,
    shouldAddSpace,
    handleClick,
  }
}
