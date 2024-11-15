import 'dotenv/config'; 
import express from "express";
import cors from 'cors';
import user_router from './app/routers/user.router.js';
import auth_router from './app/routers/auth.router.js';
import event_router from './app/routers/event.router.js';
import draw_router from './app/routers/draw.router.js';
import me_router from './app/routers/me.router.js';
import cookieParser from 'cookie-parser';
import limiter from './app/middlewares/rateLimit.js';


const app = express();

app.use(cors({
    origin: ['http://localhost:5173'], // add here the front url
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Ensure credentials are included in requests
}));

app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(user_router);
app.use(auth_router);
app.use(event_router);
app.use(draw_router);
app.use(me_router);



// Listen to the port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
