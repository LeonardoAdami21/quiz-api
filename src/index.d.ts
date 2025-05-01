declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
      role: string;
      password: string;
      name: string;
      score?: string[];
    };
  }
}
