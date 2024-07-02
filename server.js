import 'dotenv/config'; 
import express from "express";
import event_router from "./app/routers/event.router.js";

const app = express();

app.use(express.json());

app.use(event_router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.BASE_URL}:${process.env.PORT}`);
});