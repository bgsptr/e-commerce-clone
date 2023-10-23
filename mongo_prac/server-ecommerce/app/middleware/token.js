import {privateKey, publicKey} from "../../envKey.js";
import jwt from "jsonwebtoken";
import db from "../configs/sqlConfig.js";

const tokenMiddleware = (req, res, next) => {
    console.log(req.headers)
    const authHeader = req.headers.authorization;
    // // console.log(authHeader);
    const token = null || authHeader.substring(7);
    const verifyOpt = {
        algorithm: ["RS256"]
    }
    if(token == null) {
        res.send({message: "Login Terlebih Dahulu"})
    }
    jwt.verify(token, publicKey, verifyOpt, (err, decoded) => {
        if(err) {
            res.send({message: "Invalid Token"});
        } else {
            req.session.cookie.token = decoded
            db.query(`SELECT * FROM users WHERE username_user = "${decoded.user}"`, (err, info) => {
                if(err) throw err;
                res.locals.info = info[0];
                next();
            })
        }
    })
}

export default tokenMiddleware;