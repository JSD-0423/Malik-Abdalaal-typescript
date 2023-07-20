
import { Request } from 'express';
import { User } from './user'; 

export interface UserRequest extends Request {
  user: User;
}
