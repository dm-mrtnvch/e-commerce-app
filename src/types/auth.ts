export interface Credentials {
  access_token: string | null;
  expires_in: number;
  scope: string;
  refresh_token: string | null;
  token_type: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  grant_type?: string;
}
