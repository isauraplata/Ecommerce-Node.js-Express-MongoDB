import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import routerAuth from "./routers/authRoutes.js";
import routerCategories from "./routers/categoriesRoutes.js";
import "./connection.js"
import rateLimit from "express-rate-limit";
import routerProducts from "./routers/productsRoutes.js";
import routerShopping from "./routers/shoppingCartsRoutes.js";
import routerPaypal from "./routers/paypalRoutes.js";

const app= express();
config();
app.use(express.json());

const origin = process.env.CORS_ORIGIN || 'http://localhost:5173'; //frontend react

app.use(cors({ credentials: true, origin: origin }));

app.use(cookieParser());


// Middleware de límite de tasa global
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 100, // Máximo de solicitudes por minuto
    message: 'Demasiadas solicitudes desde esta dirección IP, por favor inténtalo de nuevo más tarde.'
});


app.use(limiter);

const port=process.env.PORT_SERVER;

app.listen(port,()=>{
    console.log("listening on port "+port);
});

app.use("/api/v1",routerProducts)
app.use("/api/v1",routerAuth)
app.use("/api/v1",routerCategories)
app.use("/api/v1",routerShopping)
app.use("/api/v1",routerPaypal)