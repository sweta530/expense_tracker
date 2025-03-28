import Joi from "joi";

export const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(data);
};

export const validateUserUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    status: Joi.string().valid("active", "inactive").optional(),
  });

  return schema.validate(data);
};
