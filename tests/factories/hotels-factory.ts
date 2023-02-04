import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRooms(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: 4,
      hotelId,
    },
  });
}

export async function returnRooms(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId
    }
  });
}
