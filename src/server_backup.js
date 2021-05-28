import express from 'express';

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
  const { url } = req;
  if (url === '/protected') {
    return res.send('<h1>Not Allowed</h1>');
  }
  next();
};

const handleHome = (req, res, next) => res.send('I love middlewares');
const handleProtected = (req, res) => res.send('Welcome to the private rounge');

app.use(logger);
app.use(privateMiddleware);

app.get('/', handleHome);
app.get('/protected', handleProtected);

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
