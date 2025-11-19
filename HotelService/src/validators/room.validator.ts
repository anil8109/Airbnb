import { z } from "zod";

export const getAvailableRoomSchema = z.object({
    roomCategoryId: z.string({message: "Room category schema is required"}),
    checkInDate: z.string({message: "check in date is required"}),
    checkOutDate: z.string({message: "check out date is required"}),
})

export const updateBookingIdToRoomsSchema = z.object({
    bookingId: z.number({message: "Booking ID is required"}),
    roomIds: z.array(z.number()).min(1, {message: "At least one room ID is required"})
}); 