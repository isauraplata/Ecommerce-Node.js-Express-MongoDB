import { Router } from "express";
import authorization from "../middleware/auth.js";
import { createPurchase , deletePurchase, getAll} from "../controllers/shoppingCartController.js";


const shoppingCartRouter = Router();

shoppingCartRouter.get("/shoppingCarts", getAll);
shoppingCartRouter.post("/purchase", createPurchase);
shoppingCartRouter.delete("/deletePurchase/:id", deletePurchase);

//
// shoppingCartRouter.post("/create-order", createOrder);

// shoppingCartRouter.get("/capture-order", captureOrder);

// shoppingCartRouter.get("/cancel-order", cancelPayment);

export default shoppingCartRouter;