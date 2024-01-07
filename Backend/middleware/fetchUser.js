var jwt = require('jsonwebtoken');
const JWT_SECRET = "Hridhima$react"


const fetchuser = (req, res, next) => {
    //Get user from the token and add id to req object

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please Authenticate with valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "Please Authenticate with valid token" })

    }
}



module.exports = fetchuser;