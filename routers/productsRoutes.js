import { Router } from "express";
import { updateProduct, deleteProduct, getBestSellingProduct, getProducts , foundProduct, createProduct} from "../controllers/productController.js";
import authorization from "../middlewares/auth.js";
import checkRole from "../middlewares/verifyRole.js";
import { upload } from "../controllers/fileController.js";


const routerProducts = Router();


routerProducts.post("/foundProduct", authorization,foundProduct); 
routerProducts.post("/products",[checkRole, upload],createProduct); 
routerProducts.delete("/products/:id",checkRole ,deleteProduct); 
routerProducts.put("/products/:id",checkRole ,updateProduct); 
routerProducts.get("/products",authorization, getProducts);
routerProducts.get("/getBestSellingProduct",authorization, getBestSellingProduct);


export default routerProducts;