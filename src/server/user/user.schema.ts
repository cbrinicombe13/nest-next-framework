import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../../shared/types/auth';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
