import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id,email,expiresIn) => {

    const payload = {id,email};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
    return token;
}

export const verifyToken = async(req,res,next) => {
const token = req.signedCookies[COOKIE_NAME];
console.log(token);
if (!token || token.trim() === ""){
    return res.status(401).json({error: "Token not received"});
    
}
return new Promise((resolve,reject) => {
    if (!token) {
        return reject("No token found");
    }
   return jwt.verify(token, process.env.JWT_SECRET, (err,success) => {
        if (err) {
             reject(err);
             return res.status(401).json({error: "Unauthorized"});
        }
        else {
            resolve();
            res.locals.jwtData = success;
            return next();
        }
    });
});

}