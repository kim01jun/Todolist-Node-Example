export interface IOAuthRequest {
  code: string;
}

export interface ITokenResponse {
  access_token: string;
  token_token: string;
  expires_int: string;
}

export interface IInfoResponse {
  id: string;
  name: string;
}
