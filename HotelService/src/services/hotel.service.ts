import { CreateHotelDTO } from "../dto/hotel.dto";
import { createHotel, deleteHotel, getHotelById, getHotels, updateHotel } from "../repositories/hotel.repository";

export async function createHotelService(hotelData: CreateHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await getHotelById(id);
    return hotel;
}

export async function getAllHotelsService() {
    const hotel = await getHotels();
    return hotel;
}

export async function deleteHotelService(hotelId: number) {
    const hotel = await deleteHotel(hotelId);
    return hotel;
}

export async function updateHotelService(id: number, updateData: Partial<CreateHotelDTO>) {
    const hotel = await updateHotel(id, updateData);
    return hotel;
}