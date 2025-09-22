import { User, UserRole } from "../entity/User.js";
import { generateToken } from "../utils/generateToken.js";
import { validatePassword } from "../utils/validatePassword.ts.js";
import { AppDataSource } from "../database/data-source.js";

export const loginUser = async (email: string, password: string) => {
  try {
    console.log("🔹 Email Received:", email);
    console.log("🔹 Checking User in Database...");
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    console.log(user)
    
    if (!user) {
      console.log("❌ User not found");
      throw new Error("Invalid email or password1");
    }
    
    console.log("🔹 Checking Password...");
    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
      console.log("❌ Password is incorrect");
      throw new Error("Invalid  password");
    }
    console.log("🔹 Generating Token...");
    const token = generateToken(user.id, user.role,user.name);
    return { message: "Login successful", token };
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};
