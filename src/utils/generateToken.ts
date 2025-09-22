import jwt from "jsonwebtoken";

export const generateToken = (userId: number, role: string,name:string): string => {
  const payload = { userId, role,name};
  const secretKey = process.env.JWT_SECRET_KEY || "myjwtsecretkey";
  const expiresIn = "1d";
  return jwt.sign(payload, secretKey, { expiresIn });
};
