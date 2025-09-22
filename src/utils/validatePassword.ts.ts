import bcrypt from "bcryptjs";

export const validatePassword = async (
  enteredPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    console.log(enteredPassword)
    return await bcrypt.compare(enteredPassword, hashedPassword);
  } catch (error) {
    throw new Error("Error while validating password");
  }
};
