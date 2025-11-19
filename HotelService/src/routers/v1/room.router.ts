import express from 'express';
import { getAvailableRoomsHandler, updateBookingIdToRoomsHandler } from '../../controllers/room.controller';
import { validateQueryParams, validateRequestBody } from '../../validators';
import { getAvailableRoomSchema, updateBookingIdToRoomsSchema } from '../../validators/room.validator';

const roomRouter = express.Router();

roomRouter.get('/available', validateQueryParams(getAvailableRoomSchema), getAvailableRoomsHandler);
roomRouter.post('/update-booking-id', validateRequestBody(updateBookingIdToRoomsSchema), updateBookingIdToRoomsHandler);

export default roomRouter;