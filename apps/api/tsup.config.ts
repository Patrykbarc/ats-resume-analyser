import { cp } from 'fs/promises'
import { resolve } from 'path'
import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    format: ['esm'],
    entryPoints: ['src/server.ts'],
    async onSuccess() {
      await cp(resolve('src/templates'), resolve('dist/templates'), {
        recursive: true,
        force: true
      })

      if (options.watch) {
        const { spawn } = await import('child_process')
        spawn('node', ['dist/server.js'], { stdio: 'inherit' })
      }
    },
    minify: !options.watch,
    external: ['pino']
  }
})
