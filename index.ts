import express, { Request, Response } from 'express';
import { Book } from './models/Book';
import { Rent } from './models/Rent';
import { User } from './models/User';
import bodyParser from 'body-parser';
import './config/passport-config';
import passport from 'passport';
import authRoutes from './routes/auth-routes';
import bookRoutes from './routes/book-routes';



const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/book', bookRoutes);

// Create a new book
app.post('/books', async (req: Request, res: Response) => {
  try {
    const { title, author } = req.body;
    const book = await Book.create({ title, author }, { fields: ['title', 'author'] });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a book by ID
app.get('/books/:id', async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all books
app.get('/books', async (_req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a book by ID
app.put('/books/:id', async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const { title, author } = req.body;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.title = title;
    book.author = author;
    await book.save();
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a book by ID
app.delete('/books/:id', async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new user (registration)
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'User registration failed' });
  }
});

// Get a user by ID
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); 

// Create a new rent request
app.post('/rents', async (req: Request, res: Response) => {
  try {
    const { userId, bookId } = req.body;
    const rentRequest = await Rent.create();
    res.json({ message: 'Rent request created successfully', rentRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Rent request creation failed' });
  }
});

// Get a rent request by ID
app.get('/rents/:id', async (req: Request, res: Response) => {
  try {
    const rentId = req.params.id;
    const rentRequest = await Rent.findByPk(rentId);
    if (!rentRequest) {
      return res.status(404).json({ message: 'Rent request not found' });
    }
    res.json(rentRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
