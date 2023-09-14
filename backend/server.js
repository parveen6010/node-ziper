import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import  {notes} from "./data/notes.js";
import colors from "colors";
import path from "path";

import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//       res.send("APIs is running..");
//     });
  
  //   app.get("/api/notes",(req,res)=> {
  //     console.log("recive");
  //  res.json(notes);
  //   })


app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);


// // --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frntend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frntend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// // --------------------------deployment------------------------------


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000 ;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);

// app.listen(8000, console.log("start"));