import Joi from "joi";

export const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  });

  return schema.validate(data);
};
