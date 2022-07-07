import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

const handler = async (error: any, request: Request, response: Response, next: NextFunction) => {
  const { name, details, message } = error;
  console.log('name', name);
  console.log('dls', details);
  console.log('msn', message);
  switch (name) {
    case 'ValidationError': {
      return response.status(400).json({ message: details[0].message });
    }
    case 'Unauthorized':
      return response.status(401).json({ message });
    default:
      console.error(error);
      response.sendStatus(500);
      break;
  }
  next();
};

export default handler;
