import { Module } from '@nestjs/common'
import { PostgreService } from '../postgre'
import { WorkspaceController } from './workspace.controller'
import { WorkspaceService } from './workspace.service'

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, PostgreService]
})
export class WorkspaceModule {}
