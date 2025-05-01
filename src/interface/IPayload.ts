export interface IPayload {
  sub: string;
  name: string;
  email: string;
  role: string;
  password: string;
  id?: string;
  iat?: number;
  exp?: number;
}
