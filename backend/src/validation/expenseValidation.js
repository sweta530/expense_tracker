import Joi from "joi";

export const validateExpense = (data) => {
  const schema = Joi.object({
    user_id: Joi.number().integer().required(),
    category: Joi.string().min(3).max(100).required(),
    amount: Joi.number().precision(2).positive().required(),
    date: Joi.date().iso().required(),
    description: Joi.string().max(255).optional(),
  });

  return schema.validate(data);
};

export const validateExpenseUpdate = (data) => {
  const schema = Joi.object({
    user_id: Joi.number().integer().optional(),
    category: Joi.string().min(3).max(100).optional(),
    amount: Joi.number().precision(2).positive().optional(),
    date: Joi.date().iso().optional(),
    description: Joi.string().max(255).optional(),
  });

  return schema.validate(data);
};
