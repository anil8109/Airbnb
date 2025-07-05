import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { NotFoundError } from "../utils/errors/app.error";
import BaseRepository from "./base.repository";

export class HotelRepository extends BaseRepository<Hotel> {
    constructor(){
        super(Hotel);
    }

    // We are overriding the base repository findAll method here because here we need to use where so we are overriding
    async findAll() {
        const hotels = await this.model.findAll({
            where: {
                deletedAt: null
            }
        });
        if (!hotels) {
            logger.error(`No hotels found`);
        }

        logger.info(`Hotels found: ${hotels.length}`);
        return hotels;
    }

    // Extra function added
    async softDelete(id: number) {
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
}