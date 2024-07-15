// middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('Authorization header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'No header' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Pas de token' });
  }

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    req.user = await User.findByPk(decoded.id); // Ajouter l'utilisateur décodé à req.user
    next();
  } catch (error) {
    console.error(error.message)
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticate;
