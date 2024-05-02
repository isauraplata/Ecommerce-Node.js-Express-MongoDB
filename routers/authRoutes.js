import { Router } from "express";
import { signIn, signUp, logout } from "../controllers/authController.js";
import authorization from "../middlewares/auth.js";
const routerAuth = Router();


routerAuth.post("/signin", signIn); 
routerAuth.post("/signup" ,signUp); 
routerAuth.get("/logout",authorization, logout)


export default routerAuth;