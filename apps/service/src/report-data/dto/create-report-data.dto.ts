export class CreateReportDataDto {
  readonly reportId: string
  readonly level?: string
  readonly type: string
  readonly message?: string
  readonly data?: Record<string, any>
  readonly env: string
}
