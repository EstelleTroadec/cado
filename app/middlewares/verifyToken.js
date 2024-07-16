import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Received Token:', token);
    if (!token) {
        return res.status(401).json({ message: 'Access denied bc token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.log('Decoded Token:', decoded); // Ajoutez cette ligne pour déboguer

        req.user = decoded; // Add decoded user data to req.user
        next();
    });
};

export default verifyToken;
