import { Injectable } from '@nestjs/common'
import { PostgreService } from '../postgre'

@Injectable()
export class WorkspaceService {
  constructor(private readonly postgre: PostgreService) {}
}
