export interface User {
  id?: number;
  email: string;
  username: string;
  roles: { authority: string }[];
  apiKeys: ApiKey[];
}

export interface ApiKey {
  id?: number;
  name: string;
  apiKey: string;
}
