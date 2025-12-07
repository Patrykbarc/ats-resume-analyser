import { cp } from 'fs/promises'
import { resolve } from 'path'
import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    format: ['esm'],
    entryPoints: ['src/server.ts'],
    onSuccess: async () => {
      await cp(resolve('src/templates'), resolve('dist/templates'), {
        recursive: true,
        force: true
      })
    },
    minify: !options.watch,
    external: ['pino']
  }
})
