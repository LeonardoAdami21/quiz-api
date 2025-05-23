declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
      roles: string;
      password: string;
      name: string;
      score?: string[];
    };
  }
}
