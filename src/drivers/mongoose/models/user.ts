import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  refId: { type: String, required: true },
  avatar: { type: String },
})

export type IUser = ReturnType<(typeof UserModelMongo)['hydrate']>

export const UserModelMongo = model('user', userSchema)
