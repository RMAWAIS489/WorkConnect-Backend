import { User } from "./entity/User.js";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: string };
    }
  }
}
