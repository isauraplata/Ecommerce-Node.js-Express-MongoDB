import { Router } from "express";
import authorization from "../middlewares/auth.js";
import { createPurchase , deletePurchase, getAll} from "../controllers/shoppingCartController.js";

const routerShopping = Router();

routerShopping.get("/my-cart", authorization, getAll);
routerShopping.post("/new-cart", authorization, createPurchase);
routerShopping.delete("/delete-cart/:id", authorization, deletePurchase);

export default routerShopping;
