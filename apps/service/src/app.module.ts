import { Module } from '@nestjs/common'
import { WorkspaceModule } from './workspace/workspace.module'

@Module({
  imports: [WorkspaceModule],
  controllers: [],
  providers: []
})
export class AppModule {}
