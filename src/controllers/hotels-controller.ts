import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotels-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelService.getHotels(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'notPaid') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = req.params.hotelId;

  try {
    const ticketTypes = await hotelService.getHotelRoom(userId, hotelId);

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    if (error.name === 'notPaid') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
