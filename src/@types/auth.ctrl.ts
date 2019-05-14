export interface IOAuthRequest {
  code: string;
}

export interface IFacebookTokenResponse {
  access_token: string;
  token_token: string;
  expires_int: string;
}

export interface IFacebookInfoResponse {
  id: string;
  name: string;
}
