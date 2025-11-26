import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/hooks/useLoginMutation'
import { LoginUserSchema, LoginUserSchemaType } from '@monorepo/schemas'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { HTMLInputTypeAttribute } from 'react'

type FormFields = {
  fieldName: keyof LoginUserSchemaType
  label: string
  placeholder: string
  type: HTMLInputTypeAttribute
}

const FORM_FIELDS: FormFields[] = [
  {
    fieldName: 'email',
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email'
  },
  {
    fieldName: 'password',
    label: 'Password',
    placeholder: '******',
    type: 'password'
  }
]

export function LoginForm() {
  const navigate = useNavigate()
  const { mutate, isPending, isSuccess, error } = useLoginMutation({
    onSuccess: () => {
      navigate({ to: '/' })
    }
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onSubmit: LoginUserSchema
    },
    onSubmit: async ({ value }) => {
      mutate(value)
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4 relative z-10"
    >
      <FieldGroup>
        {FORM_FIELDS.map((item) => {
          return (
            <form.Field
              key={item.fieldName}
              name={item.fieldName}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>{item.label}</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder={item.placeholder}
                      disabled={isPending || isSuccess}
                      type={item.type}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          )
        })}
      </FieldGroup>

      <Button type="submit">Login</Button>

      {error?.status === StatusCodes.UNAUTHORIZED ? (
        <FieldError>Invalid login or password</FieldError>
      ) : (
        <FieldError>{error?.message}</FieldError>
      )}
    </form>
  )
}
