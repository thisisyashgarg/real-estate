const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/userRoute");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// mongoose connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user', userRouter);
app.use(fileUpload());

// Connect to the database
connectDB().then(
  ()=>{
    __dirname = path.resolve();
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "/frontend/build")));

      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
      });
    } else {
      app.get("/", (req, res) => {
        res.send("Server is Running! 🚀");
      });
    }

      }
).catch((error) => {
  console.log(error);
});

module.exports = app;
