import { CreateRoomCategoryDTO } from "../dto/roomCategory.dto";
import { HotelRepository } from "../repositories/hotel.repository";
import RoomCategoryRepository from "../repositories/roomCategory.repository";
import { NotFoundError } from "../utils/errors/app.error";

const roomCategoryRepository = new RoomCategoryRepository();
const hotelRepository = new HotelRepository();

export async function createRoomCategoryService(createRoomCategoryDto: CreateRoomCategoryDTO) {
    const roomCategory = await roomCategoryRepository.create(createRoomCategoryDto);
    return roomCategory;
}

export async function getRoomCategoryByIdService(id: number) {
    const roomCategory = await roomCategoryRepository.findById(id);
    return roomCategory;
}

export async function getAllRoomCategoryByHotelIdService(hotelId: number) {
    const hotel = await hotelRepository.findById(hotelId);
    if (!hotel) {
        throw new NotFoundError(`Hotel with give id ${hotelId} is not found`);
    }

    const roomCategories = await roomCategoryRepository.findAllByHotelId(hotelId);
    return roomCategories;
}

export async function deleteRoomCategoryService(id: number) {
    const roomCategory = await roomCategoryRepository.findById(id);
    if (!roomCategory) {
        throw new NotFoundError(`Room category not found for id ${id}`);
    }

    await roomCategoryRepository.delete({ id });
}