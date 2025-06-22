import { Request, Response, NextFunction } from "express";
import { createHotelService, deleteHotelService, getAllHotelsService, getHotelByIdService, updateHotelService } from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";

export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    //1. Call the service layer
    const hotelResponse = await createHotelService(req.body);

    //2. Send response
    res.status(StatusCodes.CREATED).json({
        message: 'Hotel created successfully',
        data: hotelResponse,
        success: true,
    })
}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    const hotelResponse = await getHotelByIdService(Number(req.params.id));

    res.status(StatusCodes.OK).json({
        message: 'Hotel fetched successfully',
        data: hotelResponse,
        success: true,
    });
}

export async function getAllHotelsHandlers(req: Request, res: Response, next: NextFunction) {
    const hotels = await getAllHotelsService();

    res.status(StatusCodes.OK).json({
        message: 'Hotels fetched successfully',
        data: hotels,
        success: true,
    });
}

export async function deleteHotelsHandlers(req: Request, res: Response, next: NextFunction) {
    const hotelId = Number(req.params.id);
    await deleteHotelService(hotelId);

    res.status(StatusCodes.OK).json({
        message: `Hotel with ID ${hotelId} deleted successfully`,
        success: true,
    });
}

export async function updateHotelsHandlers(req: Request, res: Response, next: NextFunction) {
    const hotelId = Number(req.params.id);
    const updatedHotel = await updateHotelService(hotelId, req.body);

    res.status(StatusCodes.OK).json({
        message: 'Hotel updated successfully',
        data: updatedHotel,
        success: true,
    });
}
