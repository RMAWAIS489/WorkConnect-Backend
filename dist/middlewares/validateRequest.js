import { ZodError } from "zod";
export const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                params: req.params,
                query: req.query,
                body: req.body,
            });
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ message: error.errors[0].message });
            }
            else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    };
};
