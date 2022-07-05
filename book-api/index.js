const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
require('dotenv').config();
const Book = require('./models/book');
const book = require('./models/book');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(express.json());

app.use(express.static('build'));

app.use(requestLogger);

app.use(cors());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.post('/api/books', (request, response, next) => {
  const body = request.body;

  const book = new Book({
    title: body.title,
    author: body.author,
    description: body.description,
  });

  book
    .save()
    .then((savedBook) => {
      response.json(savedBook);
    })
    .catch((error) => next(error));
});

app.get('/api/books', async (request, response) => {
  const books = await Book.find({}).then((books) => {
    response.json(books);
  });
});

app.delete('/api/books/:id', (request, response, next) => {
  Book.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get('/api/books/:id', (request, response, next) => {
  Book.findById(request.params.id)
    .then((book) => {
      if (book) {
        response.json(book);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.put('/api/books/:id', (request, response, next) => {
  const { title, author, description } = request.body;

  Book.findByIdAndUpdate(
    request.params.id,
    { title, author, description },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
    .then((updatedBook) => {
      response.json(updatedBook);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
