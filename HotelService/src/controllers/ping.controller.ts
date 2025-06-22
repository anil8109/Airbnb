import {Request, Response, NextFunction} from 'express';
// import fs from "fs";
// import fs from "fs/promises";
import { InternalServerError } from '../utils/errors/app.error';
import logger from '../config/logger.config';

// export const pingHandler = (req: Request, res: Response, next: NextFunction) => {
//     // console.log('calling pong', req.body);
    
//     // res.send({
//     //     message: 'pong',
//     //     success: true
//     // });

//     //Handeling synchronous error
//         // throw new Error("There is an error");

//     // Handeling Asynchronous error
//         // fs.readFile('sample', (err, data) => {
//         //     if (err) {
//         //         console.log('Error while reading the file', err);
//         //         next(err);
//         //     }
//         // })

//         // but above gives error in html formate we should change/customize it    
// }

// export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
//     // Hendeling Asynchronous error by customiziting.
//     try {
//         await fs.readFile('sample');
//         res.status(200).json({message: 'Pong!'})
//     } catch (error) {
//         console.log(error);
//         next(error); // Here works genericErrorHandeler
//     }
// }

// Now without try catch 
    // We do not need try catch and calling of next(error); explicitly in express version 5 when error comes it auto calls next.
// export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
//         await fs.readFile('sample');
//         res.status(200).json({message: 'Pong!'})
// }

// Now message is same for all types of errors
// Now message should change for specific erros 

// Now message should come customised for specific errors
export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // logger.info('Ping request recieved', { correlationId: req.headers['x-correlation-id'] });
        // Now we do not need to attach the correlationID with logger { correlationId: req.headers['x-correlation-id'] }
        // since we have used AsyncLocalStorage
        logger.info('Ping request recieved');
        // await fs.readFile('sample');
        res.status(200).json({message: 'Pong!'})
    } catch (err) {
        throw new InternalServerError('Something went wrong');
    }
}

