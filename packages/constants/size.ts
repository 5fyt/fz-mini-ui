export const componentSizes = ['', 'default', 'small', 'large'] as const

export type ComponentSizes = (typeof componentSizes)[number]
