import { expressjwt } from 'express-jwt';

export const auth = expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
});

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
    if (!req.auth || !req.auth.role.admin) {
        return res.sendStatus(403); 
    }
};

