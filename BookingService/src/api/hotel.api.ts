import axios from 'axios';
import { serverConfig } from '../config';

// To do: We should find rooms using hotelId as well but for simplicity, we are not doing that here
export const getAvailableRooms = async (roomCategoryId: number, checkInDate: string, checkOutDate: string) => {
    const response = await axios.get(`${serverConfig.HOTEL_SERVICE_URL}rooms/available`, {
        params: {
            roomCategoryId,
            checkInDate,
            checkOutDate
        }
    })

    return response.data;
}

export const updateBookingIdToRooms = async (bookingId: number, roomIds: number[]) => {
    try {
        const response = await axios.post(`${serverConfig.HOTEL_SERVICE_URL}rooms/update-booking-id`, {
            bookingId,
            roomIds
        });
        return response.data;
    } catch (error) {
        console.error('Error updating booking ID to rooms:', error.message);
        throw new Error('Failed to update booking ID to rooms');
    }
}