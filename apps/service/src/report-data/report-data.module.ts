import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ReportData, ReportDataScheme } from './report-data.schema'
import { ReportDataService } from './report-data.service'
import { ReportDataController } from './report-data.controller'
import { ReportDataResolver } from './report-data.resolver'

@Module({
  imports: [MongooseModule.forFeature([{ name: ReportData.name, schema: ReportDataScheme }])],
  providers: [ReportDataService, ReportDataResolver],
  controllers: [ReportDataController]
})
export class ReportDataModule {}
