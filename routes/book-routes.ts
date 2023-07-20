import express, { Response } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import { Book } from '../models/Book';
import { Rent } from '../models/Rent';
import { RequestWithUser } from '../types'; 



const router = express.Router();

// Route that requires authentication
router.post('/rent/:bookId', authMiddleware, async (req: RequestWithUser, res: Response) => {
  try {
    const { bookId } = req.params;
    const { id: userId } = req.user; // This is the authenticated user's id

    // Check if the book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the book is available for rent (add your custom logic here)
    if (!book.availableForRent) {
      return res.status(400).json({ message: 'Book not available for rent' });
    }

    const rentRequest = await Rent.create({ userId, bookId });

    return res.json({ message: 'Rent request successful', rentRequest });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Rent request failed' });
  }
});

export default router;
