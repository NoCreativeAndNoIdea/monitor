import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { DocumentScalar } from '../common/scalars/document.scalar'

export type ReportDataLevel = 'info' | 'warn' | 'error'

@ObjectType()
@Schema({})
export class ReportData {
  @Field()
  _id: string

  @Field()
  @Prop({
    required: true,
    unique: true
  })
  reportId: string

  @Field()
  @Prop({
    default: 'info'
  })
  level: ReportDataLevel

  @Field()
  @Prop({
    required: true
  })
  type: string

  @Field()
  @Prop({
    default: ''
  })
  message: string

  @Field(() => DocumentScalar, {
    nullable: true
  })
  @Prop({
    default: {},
    type: Object
  })
  data: object

  @Field()
  @Prop({
    required: true
  })
  env: string

  @Field()
  @Prop({
    default: Date.now()
  })
  reportTime: Date
}

export type ReportDataDocument = HydratedDocument<ReportData>

export const ReportDataScheme = SchemaFactory.createForClass(ReportData)
