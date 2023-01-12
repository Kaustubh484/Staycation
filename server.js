const express=require('express');
const {connectDB,connect}=require('./config/db');
const config = require('config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app=express();

//connect database 
connectDB();

// Init MiddleWare
app.use(express.json({ extended : false}))
app.get('/',(req,res)=>res.send('API Running'));

//Auth modules
const crypto= require('crypto');
const authRoutes= require(`./routes/authRoutes`);
// const sessionStore= new MongoStore({
//     mongooseConnection:connect,
//     collection:'sessions'
// })

app.use(session({
    secret: 'kaustubhssecret',
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({
        mongoUrl:config.get('mongoURI'),
    }),
    cookie:{
    maxAge:60*60*24*1000
    }
}))



 const passport=require(`./config/passport`);

app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use(authRoutes);


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));