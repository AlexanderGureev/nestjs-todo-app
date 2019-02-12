import * as Joi from "joi";

export const limitSchema = Joi.object().keys({
  limit: Joi.number()
    .min(1)
    .max(100)
    .default(10),
});
