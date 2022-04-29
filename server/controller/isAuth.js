const jsonwebtoken = require('jsonwebtoken');

const isAuthorization = () => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.accessToken;
            
            if(!token) {
                console.log("No token");
                req.user = undefined;
                return res.status(200).json({message: "Unauthorized"});
            } else {
                const decoded = jsonwebtoken.verify(token, "12");
                req.user = decoded;
                next();
            }
        } catch (error) {
            req.user = undefined;
            next(error)
        }
    }
}

module.exports.isAuthorization = isAuthorization;