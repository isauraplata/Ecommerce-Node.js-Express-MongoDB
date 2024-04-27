import { Router } from "express";
import { updateProduct, deleteProduct, getBestSellingProduct, getProducts , foundProduct, createProduct} from "../controllers/productsController.js";
import authorization from "../middleware/auth.js";


const routerProducts = Router();


routerProducts.post("/foundProduct", authorization,foundProduct); 
routerProducts.post("/products", authorization,createProduct); 
routerProducts.delete("/products/:id",authorization ,deleteProduct); 
routerProducts.put("/products/:id",authorization ,updateProduct); 
routerProducts.get("/products",authorization, getProducts);
routerProducts.get("/getBestSellingProduct",authorization, getBestSellingProduct);


export default routerProducts;