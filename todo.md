# Project TODOs

This file collects all TODO comments and notes from the codebase for easy tracking and planning.

---

## BookingService/src/services/booking.service.ts

- To do: release rooms if booking is not confirmed or cancelled for any reason
- To do: move updateBookingIdToRooms to confirmBookingService
- To do optional: Pass idempotency key from client side instead of generating it in service
- To do optional: make locking more granular based on roomId as well
- To do: We should find rooms using hotelId as well but for simplicity, we are not doing that here
- Todo: get userId from auth token in real world application, Add booking app also in auth service
- ToDo: move this to confirm booking
- to do: release rooms if booking is not confirmed or cancelled for any reason

## BookingService/src/api/hotel.api.ts

- To do: We should find rooms using hotelId as well but for simplicity, we are not doing that here

## HotelService/src/controllers/room.controller.ts

- To do: We should find rooms using hotelId as well but for simplicity, we are not doing that here

## AuthInGo/router/router.go

- To do: Add

## learnedSoFar.txt

- 10. Hooks in Sequelize // todo.
- MySQL Open Table Cach: // todo
- MySQL redo logs: // todo works for disk based files that store all changes made to the database including both commited and uncommitted transaction.
- Elastic search // todo and how to update from db to elastic search.
- 17. transactions in database// TODO
- // Servivce discovery // TODO
- 28. Builder Design Pattern // ToDo: Practical of builder design pattern
- 34. Dependency Injection // ToDo

## HotelService/src/services/roomGeneration.service.ts

- TODO: Use a better query to get the rooms

## BookingService/src/routers/v1/ping.router.ts

- TODO: Resolve this TS compilation issue

## BookingService/src/config/logger.config.ts

- TODO: add logic to integrate and save logs in mongo

## HotelService/src/dto/roomGeneration.dto.ts

- TODO: Extend the controller to take request schema and decide whether it wants a sync or async flow

## HotelService/src/routers/v1/ping.router.ts

- TODO: Resolve this TS compilation issue

## BookingService/imp.txt

- But after r2 completes r1 still has old data which is not finalized so it will go to do confirm booking while confirm booking and finalized data is already

## HotelService/src/config/logger.config.ts

- TODO: add logic to integrate and save logs in mongo

## NotificationService/src/config/logger.config.ts

- TODO: add logic to integrate and save logs in mongo

## NotificationService/src/routers/v1/ping.router.ts

- TODO: Resolve this TS compilation issue
