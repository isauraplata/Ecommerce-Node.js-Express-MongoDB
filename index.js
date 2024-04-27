import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import routerAuth from "./routers/authRoutes.js";
import routerCategories from "./routers/categoriesRoute.js";
import "./connection.js"
 
import routerProducts from "./routers/productsRoute.js";
import shoppingCartRouter from "./routers/ShoppingCartsRoute.js";
import paypalRouter from "./routers/paypalRoute.js";

const app= express();
config();
app.use(express.json());
// app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use(cors())
app.use(cookieParser());
// Middleware de límite de tasa global


// const limiter = rateLimit({
//     windowMs: 60 * 1000, // 1 minuto
//     max: 100, // Máximo de solicitudes por minuto
//     message: 'Demasiadas solicitudes desde esta dirección IP, por favor inténtalo de nuevo más tarde.'
//   });

// app.use(limiter);

const port=process.env.PORT_SERVER;

app.listen(port,()=>{
    console.log("listening on port "+port);
});

app.use("/api/v1",routerProducts)
app.use("/api/v1",routerAuth)
app.use("/api/v1",routerCategories)
app.use("/api/v1",shoppingCartRouter)
app.use("/api/v1",paypalRouter)