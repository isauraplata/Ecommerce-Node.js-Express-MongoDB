import mongoose from "mongoose";


mongoose
  .connect("mongodb://localhost/ecommerce", {})
  .then((db) => console.log("db is connected"))
  .catch((error) => console.log(error + "db is NOT connected"));
