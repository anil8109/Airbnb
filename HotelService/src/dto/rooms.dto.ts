export type getAvailableRoomsDTO = {
    roomCategoryId: number, 
    checkInDate: string, 
    checkOutDate: string,
}

export type UpdateBookingIdToRoomsDTO = {
    bookingId: number,
    roomIds: number[];
}