import express from "express";
import bodyParser from "body-parser";
import db from "./app/configs/sqlConfig.js"
import mongoDB from "./app/configs/nosqlConfig.js";
import allRoutes from "./app/routes/allRoutes.js";
import cors from "cors";
import passport from "passport";
import path from "path";
import session from "express-session";
import LocalStrategy from "passport-local";
import { fileURLToPath } from 'url';
import cookie from 'cookie';

db.connect((err) => {
    if(err) console.log("mysql belum nyala");
    console.log("Mysql Connected");
});

mongoDB.connected();

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_DIR = path.join(__dirname, '/assets/')

app.set("view engine", "ejs");
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.static(HTML_DIR));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 30000000}
}));
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser((user, done) => {
    return done(null, user.username)
})

passport.deserializeUser((username, done) => {
    db.query(`SELECT * FROM users WHERE username_user = '${username}'`, (err, users) => {
        if(err) {
            return done(err);
        }
        const user = users[0];
        return done(err, user)
    })
})

const verify = (username_user, password, done) => {
    const sql = `SELECT id_user AS id, username_user AS username, password FROM users WHERE username_user = '${username_user}'`;
    db.query(sql, (err, users) => {
        if (err) {return done(err)}
        const user = users[0];
        if (!user) {
            return done(null, {message: "Username atau Password Salah"});
        }
        if (password != user.password || username_user != user.username) {
            return done(null, false, {message: "Username atau Password Salah"});
        } else {
            return done(null, user);
        }
    });
}

const strategy = new LocalStrategy(verify);

passport.use(strategy);

app.use("/api/v1", allRoutes);

app.get("/hello", (req, res) => {
    res.send({message: "hello from express"});
})

app.listen(port, () => {
    console.log("Server run at port "+port);
});