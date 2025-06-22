import express, { Request, Response } from 'express';
import { pingHandler } from '../../controllers/ping.controller';
import { validateRequestBody } from '../../validators';
import { pingSchema } from '../../validators/ping.validator';
const pingRouter = express.Router();

// function middleware1(req: Request, res: Response, next: NextFunction) {
//     console.log('middleware 1');
//     next();
// }

// function middleware2(req: Request, res: Response, next: NextFunction) {
//     console.log('middleware 1');
//     next();
// }

// pingRouter.get('/', middleware1, middleware2, pingHandler);
// pingRouter.get('/:id/comments', validateRequestBody(pingSchema), pingHandler);
pingRouter.post('/', validateRequestBody(pingSchema),pingHandler);
pingRouter.get('/health', (req:Request, res: Response) =>{
    res.status(200).send('ok');
});

export default pingRouter;