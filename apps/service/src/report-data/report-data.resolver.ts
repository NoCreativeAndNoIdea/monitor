import { Query, Resolver } from '@nestjs/graphql'
import { ReportData } from './report-data.schema'
import { ReportDataService } from './report-data.service'

@Resolver(() => ReportData)
export class ReportDataResolver {
  constructor(private readonly reportDataServer: ReportDataService) {}

  @Query(() => [ReportData])
  async reportData(): Promise<ReportData[]> {
    return this.reportDataServer.all()
  }
}
