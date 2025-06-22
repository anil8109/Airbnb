import express from 'express';
import { createHotelHandler, deleteHotelsHandlers, getAllHotelsHandlers, getHotelByIdHandler, updateHotelsHandlers } from '../../controllers/hotel.controller';
import { validateRequestBody } from '../../validators';
import { hotelSchema } from '../../validators/hotel.validator';

const hotelRouter = express.Router();

hotelRouter.post('/',
    validateRequestBody(hotelSchema), 
    createHotelHandler);
hotelRouter.get('/:id', getHotelByIdHandler);
hotelRouter.get('/', getAllHotelsHandlers);
hotelRouter.delete('/:id', deleteHotelsHandlers);
hotelRouter.put('/:id', updateHotelsHandlers);

export default hotelRouter;