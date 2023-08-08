import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateReportDataDto } from './dto/create-report-data.dto'
import { ReportData } from './report-data.schema'

@Injectable()
export class ReportDataService {
  constructor(@InjectModel(ReportData.name) private readonly reportDataModel: Model<ReportData>) {}

  async all(): Promise<ReportData[]> {
    return this.reportDataModel.find()
  }

  async create(createReportDto: CreateReportDataDto): Promise<ReportData> {
    return this.reportDataModel.create(createReportDto)
  }

  async insert(createReportDto: CreateReportDataDto[]): Promise<void> {
    await this.reportDataModel.insertMany(createReportDto)
  }
}
