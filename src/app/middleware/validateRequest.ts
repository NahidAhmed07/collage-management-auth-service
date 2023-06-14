import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

function validateRequest(Schema: AnyZodObject | ZodEffects<AnyZodObject>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default validateRequest;
