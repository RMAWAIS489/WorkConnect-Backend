import bcrypt from "bcryptjs";
export const validatePassword = async (enteredPassword, hashedPassword) => {
    try {
        console.log(enteredPassword);
        return await bcrypt.compare(enteredPassword, hashedPassword);
    }
    catch (error) {
        throw new Error("Error while validating password");
    }
};
