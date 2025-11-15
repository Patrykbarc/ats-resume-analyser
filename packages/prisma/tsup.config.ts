import { defineConfig } from 'tsup'

export default defineConfig(() => {
  return {
    format: ['esm', 'cjs'],
    entryPoints: ['prisma.config.ts']
  }
})
