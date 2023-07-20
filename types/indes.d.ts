
import { UserRequest } from './user-request';

declare global {
  namespace Express {
    interface Request extends UserRequest {}
  }
}
