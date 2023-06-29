import express, { Request, Response } from 'express';

const app = express();

const books = require('./books.json');

app.get('/books', (req: Request, res: Response) => {
  try {
    const query = req.query.q;
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid query parameter');
    }

    const filteredBooks = books.filter((book: { name: string }) =>
      book.name.toLowerCase().startsWith(query.toLowerCase())
    );

    res.json(filteredBooks);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });

  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
