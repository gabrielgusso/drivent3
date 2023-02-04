import { notFoundError, notPaid } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotels-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  const { TicketType } = await ticketRepository.findTickeWithTypeById(ticket.id);
  if (ticket.status === "RESERVED" || TicketType.isRemote || !TicketType.includesHotel) {
    throw notPaid();
  }
  const hotels = await hotelRepository.findHotels();
  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

async function getHotelRoom(userId: number, hotelId: string) {
  const isNum: boolean = /^\d+$/.test(hotelId);
  if (!isNum) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  const { TicketType } = await ticketRepository.findTickeWithTypeById(ticket.id);
  if (ticket.status === "RESERVED" || TicketType.isRemote || !TicketType.includesHotel) {
    throw notPaid();
  }
  const hotel = await hotelRepository.findHotelRooms(Number(hotelId));
  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

const hotelService = {
  getHotels,
  getHotelRoom,
};

export default hotelService;
