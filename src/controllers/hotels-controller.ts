import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelService.getHotels();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getHotelRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = req.params.hotelId

  try {
    const ticketTypes = await hotelService.getHotelRoom(userId, hotelId);

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}



