import { Router } from "express";
import authorization from "../middleware/auth.js";
import { createOrder, captureOrder, cancelPayment } from "../controllers/paypalController.js";

const paypalRouter = Router();

paypalRouter.post("/create-order", createOrder);

paypalRouter.get("/capture-order", captureOrder);

paypalRouter.get("/cancel-order", cancelPayment);


export default paypalRouter;