import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const fieldsEmpty = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required()
    .messages({
      'string.empty': fieldsEmpty,
      'any.required': fieldsEmpty,
    }),
  password: Joi.string().min(6).required()
    .messages({ 'string.empty': fieldsEmpty }),
});

const loginValidate = (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body;
  const { error } = loginSchema.validate({ email, password });

  if (error) throw error;

  next();
};

export default loginValidate;
