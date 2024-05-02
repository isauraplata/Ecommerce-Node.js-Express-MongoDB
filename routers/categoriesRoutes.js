import { Router } from "express";
import { createCategory, deleteCategory, updateCategory,getCategories } from "../controllers/categoryController.js";
import checkRole from "../middlewares/verifyRole.js"
import authorization from "../middlewares/auth.js";
const routerCategories = Router();

routerCategories.get("/categories",authorization, getCategories)
routerCategories.post("/categories", checkRole,createCategory); 
routerCategories.put("/categories/:id",checkRole,updateCategory); 
routerCategories.delete("/categories/:id",checkRole,deleteCategory); 


export default routerCategories;