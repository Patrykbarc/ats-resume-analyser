import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { logger } from '../../server'

type TemplateVars = Record<string, string | number>

export const getHtmlTemplate = (templateFile: string, vars: TemplateVars) => {
  try {
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    const templatePath = path.join(dirname, 'templates', templateFile)
    const htmlTemplate = readFileSync(templatePath, 'utf-8')
    logger.info(`Email template loaded from: ${templatePath}`)

    let finalHtml = htmlTemplate
    for (const [key, value] of Object.entries(vars)) {
      finalHtml = finalHtml.replace(
        new RegExp(`\\$\\{${key}\\}`, 'g'),
        String(value)
      )
    }
    return finalHtml
  } catch (err) {
    logger.error(`Failed to load email template: ${err}`)
    throw err
  }
}
