import { Controller, Get } from '@nestjs/common'
import { WorkspaceService } from './workspace.service'

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}
  @Get('/')
  async findAll() {
    return []
  }
}