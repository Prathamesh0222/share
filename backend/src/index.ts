import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 5000;

app.use(cors());
app.use(express());

app.use("/api/v1/user", userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})