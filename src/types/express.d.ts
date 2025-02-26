import { User } from '../users/users.entity';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}