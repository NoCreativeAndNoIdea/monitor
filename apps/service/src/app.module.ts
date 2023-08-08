import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { DocumentScalar } from './common/scalars/document.scalar'
import { WorkspaceModule } from './workspace/workspace.module'
import { ReportDataModule } from './report-data/report-data.module'
import configuration from './config/configuration'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const config = configuration()
        return {
          uri: config.mongo.url,
          ...config.mongo.option
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    WorkspaceModule,
    ReportDataModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({})],
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION]
          })
        ]
      },
      resolvers: {
        Document: DocumentScalar
      },
      include: [ReportDataModule]
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
