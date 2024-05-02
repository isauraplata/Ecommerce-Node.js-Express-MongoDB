import { Router } from "express";
import authorization from "../middlewares/auth.js";
import { captureOrder, cancelPayment } from "../controllers/paypalController.js";

const routerPaypal = Router();

routerPaypal.get("/capture-order", authorization, captureOrder);
routerPaypal.get("/cancel-order", authorization, cancelPayment);

export default routerPaypal;
