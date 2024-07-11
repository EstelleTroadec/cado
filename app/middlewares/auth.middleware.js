// middleware/auth.js
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('Authorization header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'No header' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    req.user = decoded; // Ajouter l'utilisateur décodé à req.user
    next();
  } catch (error) {
    console.error(error.message)
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticate;
