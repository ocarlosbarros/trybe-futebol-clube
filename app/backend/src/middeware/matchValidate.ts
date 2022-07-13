import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const matchSchema = Joi.object({
  homeTeam: Joi.number().min(1).required(),
  awayTeam: Joi.number().min(1)
    .invalid(Joi.ref('homeTeam'))
    .messages({ 'any.invalid': 'It is not possible to create a match with two equal teams' })
    .required(),
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
});

const matchValidate = (request: Request, response: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = request.body;
  const { error } = matchSchema.validate({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

  if (error) throw error;

  next();
};

export default matchValidate;
