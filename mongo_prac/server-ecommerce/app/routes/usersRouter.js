import express from "express";
import userSchema from "../Model/User.js"
import db from "../configs/sqlConfig.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import {privateKey, publicKey} from "../../envKey.js";
import tokenMiddleware from "../middleware/token.js";
import crypto from "crypto";
import { auth } from "google-auth-library";
import cookie from "cookie";

const app = express();

const router = express.Router();

const userRoute = "http://localhost:3000/api/v1/users";

// router.get('/:authOption', (req, res, next) => {
//     const auth = req.params.authOption;
//     if(auth == "register") {
//         res.render("register.ejs");
//     } else if(auth == "login") {
//         res.render("login.ejs")
//     }
// });

router.post('/register', (req, res) => {
    const data = {
        email: req.body.email,
        username_user: req.body.username_user,
        password: req.body.password,
    }
    const sqlInsertUser = 
    `INSERT INTO users (email, username_user, password) 
    VALUES ('${data.email}', '${data.username_user}', '${data.password}')`
    if(!userSchema.validate(data).error) {
        db.query(sqlInsertUser, (err, result) => {
            if(err) throw err;
            res.send({ message: "Successfully Insert User" });
        })
    } else {
        res.send(userSchema.validate(data).error);
    }
});

const authMiddleware = passport.authenticate('local', {
        failureRedirect: userRoute + '/login',
        failureMessage: true,
        passReqToCallback: true,
    });

router.get('/dashboard', authMiddleware, (req, res) => {
    res.send("ello")
})

router.get("/login", (req, res) => {
    const passportSess = req.session;
    if(passportSess.messages && !passportSess.passport) {
        res.send({ message: req.session.messages[0] });
    }
    if(!passportSess.passport && !passportSess.messages) {
        res.send({ message: "Anda Belum Login"})
    }
})

router.post("/login", authMiddleware, (req, res) => {
    console.log(req.body)
    const passportSess = req.session.passport; 
    if(!passportSess) {
        res.send({ message: "Failed to authenticated"});
    } else {
        const payload = req.session.passport;
        const options = {
            algorithm: 'RS256'
        };
        jwt.sign(payload, privateKey, options, (err, token) => {
            console.log(token)
            if(err) {
                res.send({ message: "Client Error, failed when set the parameter" });
            } else {
                // const setCookie = cookie.serialize("Token", token);
                // res.setHeader('Set-Cookie', setCookie, {
                //     httpOnly: true,
                //     maxAge: 60*60
                // });
                res.json({token: token});
            }
            
        });
    }
});

router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        res.redirect("login");
    })
})

const checkUserLogin = (req, res, next) => {
    if(!req.session.passport) {
        console.log("jangan lanjut, user ditendang")
        res.redirect( userRoute + "/login");
    } else {
        next();
    }
};   

router.patch("/profile", tokenMiddleware, async (req, res) => {
    console.log(req.session);
    const cookie = req.session.cookie;
    if(!cookie.token) {
        res.send({ message: "login dulu"});
    }
    const userID = cookie.token.user;
    const getUsername = `SELECT username_user, email, password, realname_user, phone_user, address_user FROM users WHERE username_user = '${userID}'`;
    
    db.query(getUsername, (err, usernameRes) => {
        if (err) {
            throw err;
            // return res.status(500).send({ message: "Internal Server Error" });
        }
        // console.log(usernameRes[0]);
        const {username_user, email, password, realname_user, phone_user, address_user} = usernameRes[0];
        // console.log(req.body);
        const validateData = {
            username_user: username_user,
            email: email,
            password: password,
            realname_user: (req.body.realname_user) ? req.body.realname_user : realname_user,
            phone_user: (req.body.phone_user) ? req.body.phone_user : phone_user,
            address_user: (req.body.address_user) ? req.body.address_user : address_user
        };
        const validateReq = userSchema.validate(validateData);

        if (!validateReq.error) {
            const sqlUpdate = `
                UPDATE users
                SET 
                realname_user = '${validateData.realname_user}',
                phone_user = '${validateData.phone_user}',
                address_user = '${validateData.address_user}'
                WHERE username_user = '${userID}'
            `;

            db.query(sqlUpdate, (err, result) => {
                if (err) {
                    return res.status(500).send({ message: "Internal Server Error" });
                }
                res.status(200).send({
                    statusCode: 200,
                    message: "Successfully Update Profile"
                });
            });
        } else {
            res.status(400).send({
                statusCode: 400,
                message: "Bad Request",
                error_details: validateReq.error.details
            });
        }
    });
});

router.get("/me", tokenMiddleware, (req, res) => {
    const info = res.locals.info
    const data = {
        id_user: info.id_user,
        email: info.email,
        username: info.username_user,
        name: info.realname_user,
        phone: info.phone_user
    };
    res.send(data);
})

router.get("/hello", (req, res) => {
    res.send({message: "Hello"});
});

router.post("/sara", (req, res) => {
    console.log(req.body);
});

export default router;