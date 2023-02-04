import { authenticateToken } from "@/middlewares";
import { Router } from "express";
import { getHotelRoom, getHotels } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getHotelRoom);

export { hotelsRouter };
