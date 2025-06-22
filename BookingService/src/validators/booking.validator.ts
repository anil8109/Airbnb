import { z } from "zod";

export const createBookingSchema = z.object({
    userId: z.number({ message: "Userid must be present"}),
    hotelId: z.number({ message: "Hotel id must be present" }),
    totalGuests: z.number({ message: "total guests must be present" }).min(1, { message: "Total guests should be greater than 1" }),
    bookingAmount: z.number({ message: "booking amount must be present" }).min(1, { message: "Booking amount should be greater than 1" })
})