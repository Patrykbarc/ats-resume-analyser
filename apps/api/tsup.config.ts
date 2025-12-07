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

      if (options.watch) {
        const { exec } = await import('child_process')
        return () => {
          exec('node dist/server.js')
        }
      }
    },
    minify: !options.watch,
    external: ['pino']
  }
})
