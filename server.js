import 'dotenv/config'; 
import express from "express";

const app = express();


app.use(express.json());
app.use(user_router);
app.use(auth_router);

app.use(event_router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.BASE_URL}:${process.env.PORT}`);
});