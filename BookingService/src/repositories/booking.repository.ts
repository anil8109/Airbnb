import { IdempotencyKey, Prisma } from "@prisma/client";
import prismaClient from "../prisma/client";
import { validate as isValidUUID } from "uuid";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

export async function createBooking(bookingInput: Prisma.BookingCreateInput) {
    const booking = prismaClient.booking.create({
        data: bookingInput
    })

    return booking;
}

export async function createIdempotencyKey(key:string, bookingId: number) {
    const idempotencyKey = await prismaClient.idempotencyKey.create({
        data: {
            idemkey: key,
            booking: {
                connect: {
                    id: bookingId
                }
            }
        }
    });
    return idempotencyKey;
}

export async function getIdempotencyKeyWithLock(tx: Prisma.TransactionClient, key: string) {

    if (!isValidUUID(key)) {
        throw new BadRequestError('Invalid Idempotency key');
    }

    // With prisma object without transaction and without pessimistic locking
    // const idempotencyKey = await prismaClient.idempotencyKey.findUnique({
    //     where: {
    //         key
    //     }
    // })

    // With transaction and pessimistic locking
    const idempotencyKey: Array<IdempotencyKey> = await tx.$queryRaw(
        Prisma.raw(`select * from IdempotencyKey where idemKey = '${key}' for update`)
    );
    if (!idempotencyKey || idempotencyKey.length === 0) {
        throw new NotFoundError('Idempotency key is not found');
    }
    return idempotencyKey[0];
}

export async function getBookingById(bookingId:number) {
    const booking = await prismaClient.booking.findUnique({
        where: {
            id: bookingId
        }
    })
    return booking;
}

export async function confirmBooking(
    tx: Prisma.TransactionClient,
    bookingId: number
) {
    // Without transaction
    // const booking = await prismaClient.booking.update({

    // With transaction
    const booking = await tx.booking.update({
        where: {
            id: bookingId
        },
        data: {
            status: "CONFIRMED"
        }
    });
    return booking;
}

export async function finalizeIdempotencyKey(tx: Prisma.TransactionClient ,key: string) {
    // Without transaction
    // const idempotencyKey = await prismaClient.idempotencyKey.update({
    //     where: {
    //         key
    //     },
    //     data: {
    //         finalized: true
    //     }
    // })

    // With transaction
    const idempotencyKey = await tx.idempotencyKey.update({
        where: {
            idemkey: key
        },
        data: {
            finalized: true
        }
    })

    return idempotencyKey;
}