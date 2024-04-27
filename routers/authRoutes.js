import { Router } from "express";
import { signIn, signUp, logout } from "../controllers/authController.js";
import authorization from "../middleware/auth.js";
const routerAuth = Router();


routerAuth.post("/signin", signIn); //login
routerAuth.post("/signup" ,signUp); //registro
routerAuth.get("/logout",authorization, logout)



export default routerAuth;