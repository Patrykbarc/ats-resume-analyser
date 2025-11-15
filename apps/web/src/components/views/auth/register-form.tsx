import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RegisterUserSchema, RegisterUserSchemaType } from '@monorepo/schemas'
import { useForm } from '@tanstack/react-form'

type FormFields = {
  fieldName: keyof RegisterUserSchemaType
  label: string
  placeholder: string
}

const FORM_FIELDS: FormFields[] = [
  {
    fieldName: 'email',
    label: 'Email address',
    placeholder: 'you@example.com'
  },
  {
    fieldName: 'password',
    label: 'Password',
    placeholder: '******'
  },
  {
    fieldName: 'confirmPassword',
    label: 'Confirm passsword',
    placeholder: '******'
  }
]

export function RegisterForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validators: {
      onSubmit: RegisterUserSchema
    },
    onSubmit: async ({ value }) => {
      console.log(value)
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

      <Button type="submit">Register</Button>
    </form>
  )
}
