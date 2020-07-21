import * as jwt from "jsonwebtoken";

export const verifyJWT = (request, response, next) => {
    const token = request.headers["access-token"];
    if (!token) {
        return response.status(401).json({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.SECRET_API, (err, decoded) => {

        if (err){
            console.log(err);
            return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        }

      request.body.decodedId = decoded.id;
      next();
    });
};

export const noVerify = (request, response, next) => {
    next();
};