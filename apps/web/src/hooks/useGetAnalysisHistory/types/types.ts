import { RequestLog } from '@monorepo/database'
import { Pagination } from '@monorepo/types'

export type HistoryLogs = Pick<
  RequestLog,
  'analyseId' | 'fileName' | 'fileSize' | 'createdAt'
>

export type AnalysisHistoryResponse = {
  logs: HistoryLogs[]
  pagination: Pagination
}
