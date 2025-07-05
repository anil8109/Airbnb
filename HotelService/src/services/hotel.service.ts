import { CreateHotelDTO } from "../dto/hotel.dto";
import { HotelRepository } from "../repositories/hotel.repository";

const hotelRepository = new HotelRepository();

export async function createHotelService(hotelData: CreateHotelDTO) {
    const hotel = await hotelRepository.create(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await hotelRepository.findById(id);
    return hotel;
}

export async function getAllHotelsService() {
    const hotel = await hotelRepository.findAll();
    return hotel;
}

export async function deleteHotelService(hotelId: number) {
    const hotel = await hotelRepository.softDelete(hotelId);
    return hotel;
}

export async function updateHotelService(id: number, updateData: Partial<CreateHotelDTO>) {
    const hotel = await hotelRepository.update(id, updateData);
    return hotel;
}