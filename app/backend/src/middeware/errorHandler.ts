import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

const handler = async (error: any, request: Request, response: Response, next: NextFunction) => {
  const { name, details } = error;

  switch (name) {
    case 'ValidationError': {
      return response.status(400).json({ message: details[0].message });
    }
    default:
      console.error(error);
      response.sendStatus(500);
      break;
  }
  next();
};

export default handler;
