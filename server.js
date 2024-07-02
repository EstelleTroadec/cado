import 'dotenv/config'; 
import express from "express";
import router from './app/routers/user.router.js';

const app = express();

app.use(router);
app.use(express.json());


app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.BASE_URL}:${process.env.PORT}`);
});