import { Router } from "express";
import { createCategory, deleteCategory, updateCategory,getCategories } from "../controllers/categoryController.js";
import checkRole from "../middleware/verifyRole.js"
import authorization from "../middleware/auth.js";
const routerCategories = Router();

routerCategories.get("/categories",authorization, getCategories)
routerCategories.post("/categories", checkRole(),createCategory); 
routerCategories.put("/categories/:id" ,updateCategory); 
routerCategories.delete("/categories/:id" ,deleteCategory); 




export default routerCategories;