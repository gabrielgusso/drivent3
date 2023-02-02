import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotels-repository";

async function getHotels() {
  const hotels = await hotelRepository.findHotels();

  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

async function getHotelRoom(userId: number, hotelId: string) {
  const isNum: boolean = /^\d+$/.test(hotelId)
  if (!isNum) {
    throw notFoundError()
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
