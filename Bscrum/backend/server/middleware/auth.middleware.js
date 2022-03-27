require("dotenv").config();
const jwt = require("jsonwebtoken");


const getUserByToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SCERECT_KEY, (err, user) => {
            if (err) return reject(err);
            return resolve(user);
        })
    });
}

const  authCheck = async (req, res, next) => {
    // 1 read the req.heders
    const headers = req.headers;
    // 2 get the access token form headers
    const accesstoken = headers.accesstoken;
    // 3 if accress token is not present in headers, then 400
    if (!(accesstoken && accesstoken.startsWith("Bearer "))) {
        return res.status(400)
            .send("User does not have access to post the product") 
    }
    // get the user info from the token

    const token =  accesstoken.split(" ")[1];
    // if toke  exists the get the user and validate
    let user;
    try {
        user = await getUserByToken(token);
        console.log(user);
        req.user = user;
    } catch(e) {
        return res.status(400)
        .send("auth token not vailed") 
    }
    req.user = user.user;
    return next();
}
module.exports = authCheck;