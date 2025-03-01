export interface LoginDto {
  username: string
  password: string
}

export interface AuthDto {
  token: string
}

export interface UserDto {
  username: string
  displayName: string
  role: string
}
