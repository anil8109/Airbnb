import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import logger from '../config/logger.config';
import { BadRequestError } from '../utils/errors/app.error';

export const validateRequestBody =(schema: AnyZodObject ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // logger.info('Validating request body', { correlationId: req.headers['x-correlation-id'] })
            // Now we do not need to attach the correlationID with logger { correlationId: req.headers['x-correlation-id'] }
        // since we have used AsyncLocalStorage
            logger.info('Validating request body')
            await schema.parseAsync(req.body);
            logger.info('Req.body is valid');
            
            next();
        } catch (error) {
            // return res.status(400); // res = function (res) => { res.setStatus(400); return res; } this is same thing written
            // res.status(400).json({
            //     message: 'Invalid Request Body',
            //     success: false,
            //     error: error
            // })
            throw new BadRequestError(`Invalid Request Body`);
        }
    }
}