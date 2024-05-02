import mongoose from "mongoose";
import { config } from "dotenv";

config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((db) => console.log("Connected to database"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1); 
  });


mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
});
