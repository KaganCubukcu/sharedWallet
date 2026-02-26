export interface UserCredentials {
  username: string;
  password: string;
  email: string;
}
export interface AuthResponse {
  token: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}
