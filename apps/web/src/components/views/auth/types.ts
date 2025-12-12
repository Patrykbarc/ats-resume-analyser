import { HTMLInputTypeAttribute } from 'react'

export type AuthFormFields<T> = {
  fieldName: keyof T
  label: string
  placeholder: string
  type: HTMLInputTypeAttribute
}
