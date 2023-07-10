const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const session = require("express-session");
const redis = require("redis");
const blogRouter = require("./routes/blogRoute");
const userRouter = require("./routes/userRoute");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_IP, REDIS_PORT, SESSION_SECRET } = require("./config/config");

app.use(cors());

let RedisStore = require("connect-redis").default ;

let redisClient = redis.createClient({
    url: `redis://${REDIS_IP}:${REDIS_PORT}`
})


redisClient.connect().catch(console.error)

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin` ;

const connectWithRetry = () => {
    mongoose.connect(mongoURL)
        .then(() => console.log("Successfully connected to database") )
        .catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000)
        });
}

connectWithRetry()

app.enable("trust proxy");

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET ,
    cookie: {
    resave: false,
    saveUninitialized: false,
        secure: false,
        maxAge: 60000,
        httpOnly: true
    }
}))


app.use(express.json());

app.get('/api', (req, res)=>{
    res.send("<h2>Hello, There!!!</h2>");
    console.log("Yeah bitch it sucks");
})

app.use("/api/blogs", blogRouter);

app.use("/api/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));