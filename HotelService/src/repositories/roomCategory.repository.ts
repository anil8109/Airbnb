import RoomCategory from "../db/models/roomCategory";
import BaseRepository from "./base.repository";

class RoomCategoryRepository extends BaseRepository<RoomCategory> {
    constructor() {
        super(RoomCategory);
    }

    async findAllByHotelId(hotelId: number) {
        const roomCategories = await this.model.findAll({
            where:{
                hotelId: hotelId,
                deletedAt: null
            }
        });

        if (!roomCategories || roomCategories.length === 0) {
            throw new Error(`No room category found for given hotel id${hotelId}`)
        }

        return roomCategories;
    }
}

export default RoomCategoryRepository;