import { NextFunction, Request, Response } from 'express';

class LoginController {
  public execute = (request: Request, response: Response, _next: NextFunction) => {
    const { email, password } = request.body;
    console.log(email, password);
    return response.status(200).json({ message: 'OK' });
  };
}

export default LoginController;
