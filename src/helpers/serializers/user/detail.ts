type UserSerializer = {
  id?: number
  username?: string
  ref_id?: string
  name?: string
}

export const userDetailSerialize = async (
  params: UserEntity,
): Promise<UserSerializer> => {
  return {
    id: params.id,
    name: params.name,
    ref_id: params.refId,
    username: params.username,
  }
}
