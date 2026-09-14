console.log("Welcome to server");

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <script>console.log("Welcome to server");</script>
    API is running
  `);
});

app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));
