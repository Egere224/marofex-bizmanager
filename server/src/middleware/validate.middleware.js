import { AppError } from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body ?? {},
      params: req.params ?? {},
      query: req.query ?? {}
    });

    if (parsed.body) req.body = parsed.body;
    if(parsed.params) req.params = parsed.params || {};

    next();
  } catch (err) {
  console.log(err);
  const message =
    err.errors?.map(e => e.message).join(", ") || "Validation error";
  next(new AppError(message, 400));
}
};