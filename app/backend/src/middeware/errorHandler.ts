import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

const handler = async (error: any, request: Request, response: Response, next: NextFunction) => {
  const { name, details, message } = error;

  if (message === 'It is not possible to create a match with two equal teams') {
    return response.status(401).json({ message: details[0].message });
  }

  switch (name) {
    case 'ValidationError':
      return response.status(400).json({ message: details[0].message });

    case 'Unauthorized':
      return response.status(401).json({ message });

    case 'JsonWebTokenError':
      return response.status(401).json({ message: 'Token must be a valid token' });

    case 'SequelizeForeignKeyConstraintError':
      return response.status(404).json({ message: 'There is no team with such id!' });

    default:
      console.error(message);
      return response.status(500).end();
  }
  next();
};

export default handler;
