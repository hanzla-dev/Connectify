import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongodb from "./db/connectToMongodb.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.get("/" , (req, res) => {
    res.send("hello world!!");
});

//routes
app.use("/api/auth", authRoutes);




app.listen(PORT, () => {
    connectToMongodb();
    console.log(`server is running on port ${PORT}`);
})
