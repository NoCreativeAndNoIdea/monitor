import type { OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '../../prisma/generated/postgre'

@Injectable()
export class PostgreService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }
}
