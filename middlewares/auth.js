import { expressjwt } from 'express-jwt';

export const auth = (req, res, next) => {
    expressjwt({
        secret: process.env.JWT_SECRET_KEY,
        algorithms: ['HS256'],
        // Optionally, you can set this to false to not send the token in the response
        requestProperty: 'auth',
    })(req, res, (err) => {
        if (err) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid or expired token',
            });
        }
        next();
    });
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
    if (!req.auth || !req.auth.role.admin) {
        return res.sendStatus(403); 
    }
};

