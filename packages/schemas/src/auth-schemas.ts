import z from 'zod'

const PasswordLoginSchema = z
  .string()
  .min(1, { message: 'Please enter a password' })
  .min(6, { message: 'Password must be at least 6 characters' })

const RegisterPasswordSchema = PasswordLoginSchema.min(8, {
  message: 'Password must be at least 8 characters'
})
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter'
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter'
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })

const RegisterUserSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: 'Please enter an email address'
      })
      .pipe(
        z.email({
          message: 'Invalid email format'
        })
      ),
    password: RegisterPasswordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

const LoginUserSchema = RegisterUserSchema.pick({ email: true }).extend({
  password: PasswordLoginSchema
})

type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>
type LoginUserSchemaType = z.infer<typeof LoginUserSchema>

export {
  LoginUserSchema,
  RegisterUserSchema,
  type LoginUserSchemaType,
  type RegisterUserSchemaType
}
