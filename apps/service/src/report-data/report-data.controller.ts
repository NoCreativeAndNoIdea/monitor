import { Body, Controller, Post } from '@nestjs/common'
import { CreateReportDataDto } from './dto/create-report-data.dto'
import { ReportDataService } from './report-data.service'

@Controller('report-data')
export class ReportDataController {
  constructor(private readonly reportDataService: ReportDataService) {}

  @Post('send-beacon')
  async create(@Body() data: CreateReportDataDto[]) {
    await this.reportDataService.insert(data)
  }
}
