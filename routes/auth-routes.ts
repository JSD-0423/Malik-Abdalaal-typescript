import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/passport-config';
import { User } from '../models/User';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
  passport.authenticate('jwt', { session: false }, (err: Error | null, user: User | false) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ id: user.id }, 'your_secret_key_here', {
      expiresIn: '1h',
    });

    return res.json({ token });
  })(req, res);
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });

    return res.json({ message: 'Registration successful' });
  } catch (err) {
    return res.status(500).json({ message: 'Registration failed' });
  }
});

export default router;
