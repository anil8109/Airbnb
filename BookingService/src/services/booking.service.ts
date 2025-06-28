import { CreateBookingDTO } from "../dto/booking.dto";
import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKeyWithLock } from "../repositories/booking.repository"
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import prismaClient from "../prisma/client";
import { redLock } from "../config/redix.config";
import { serverConfig } from "../config";

export async function createBookingService(CreateBookingDTO: CreateBookingDTO) {
    const bookingResource = `hotel:${CreateBookingDTO.hotelId}`;
    let lock;
    try {
        lock = await redLock.acquire([bookingResource], serverConfig.LOCK_TTL);
        console.log('redlock object', lock);
        
        const booking = await createBooking({
            userId: CreateBookingDTO.userId,
            hotelId: CreateBookingDTO.hotelId,
            totalGuests: CreateBookingDTO.totalGuests,
            bookingAmount: CreateBookingDTO.bookingAmount
        });

        const idempotencyKey = generateIdempotencyKey();
        await createIdempotencyKey(idempotencyKey, booking.id);
        return {
            bookingId: booking.id,
            idempotencyKey: idempotencyKey
        };
    } catch (error) {
        throw new InternalServerError('Failed to aquire lock for booking resource');
    }
}

export async function confirmBookingService(idempotencyKey: string) {

    return await prismaClient.$transaction(async (tx) => {
        const idempotencyKeyData = await getIdempotencyKeyWithLock(tx, idempotencyKey);

        if (!idempotencyKeyData || !idempotencyKeyData.bookingId) {
            throw new NotFoundError("Idempotency key not found");
        }

        if (idempotencyKeyData.finalized) {
            throw new BadRequestError('Idempotency Key is already finalised')
        }

        const booking = await confirmBooking(tx, idempotencyKeyData.bookingId);
        await finalizeIdempotencyKey(tx, idempotencyKey);

        return booking
    });
}