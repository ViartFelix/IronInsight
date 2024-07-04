export interface User
{
  id_user: number,
  username: string,
  password: string,
  email: string,

  weight: number,
  height: number,

  created_at: Date,
  updated_at: Date,
}
