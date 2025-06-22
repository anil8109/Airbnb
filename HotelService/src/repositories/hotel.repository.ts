import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { CreateHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

export async function createHotel(hotelData: CreateHotelDTO) {
    console.log('About to call Hotel.create');
    
    const hotel = await Hotel.create({
        name: hotelData.name,
        address: hotelData.address,
        location: hotelData.location,
        rating: hotelData.rating,
        ratingCount: hotelData.ratingCount,
    });
    console.log('called Hotel.create');
    

    logger.info(`Hotel Created ${hotel.id}`);
    return hotel;
}

export async function getHotelById(id: number) {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
        logger.error(`Hotel not found with ID ${id}`);
        throw new NotFoundError(`Hotel with id ${id} is not found`);
    }
    logger.info(`Fetched Hotel with ID ${id}`);
    return hotel;
}

export async function getHotels() {
    const hotel = await Hotel.findAll({
        where: {
            deletedAt: null
        }
    });
    
    logger.info(`Fetched Hotela with ID`);
    return hotel;
}

export async function deleteHotel(id: number) {

    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found with ID ${id}`);
        throw new NotFoundError(`Hotel with id ${id} is not found`);
    }

    // await hotel.destroy();
    hotel.deletedAt = new Date();
    await hotel.save();
    logger.info(`Deleted Hotel with ID ${id}`);
    return true;
}

export async function updateHotel(id: number, updateData: Partial<CreateHotelDTO>) {

    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel not found with ID ${id}`);
        throw new NotFoundError(`Hotel with id ${id} is not found`);
    }

    await hotel.update(updateData);
    return hotel;
}