const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const session = require("express-session");
const redis = require("redis");
const blogRouter = require("./routes/blogRoute");
const userRouter = require("./routes/userRoute");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_IP, REDIS_PORT, SESSION_SECRET } = require("./config/config");
// require('dotenv').config()

app.use(cors());

let RedisStore = require("connect-redis").default ;

let redisClient = redis.createClient({
    url: `redis://${REDIS_IP}:${REDIS_PORT}`
}) 


redisClient.connect().catch(console.error)

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin` ;
// const mongoURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s9pzwsh.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`


const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
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
    res.send("<h2>Hello, There</h2>");
    console.log("Yeah bitch it sucks");
})

app.use("/api/blogs", blogRouter);

app.use("/api/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));