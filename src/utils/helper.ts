import { PropType } from 'vue'

export const defineProp = <T>(val: any): PropType<T> => val
