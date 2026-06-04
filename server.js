const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // هذا السطر يسمح للمتصفح بالاتصال بالسيرفر

// 2. Global middleware to parse incoming JSON payloads
app.use(express.json());

// 1. Import the router module
const userRoutes = require('./routes/userRoutes');
app.use('/users',userRoutes);

const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);


// 👈 السطر السحري: بنقول لإكسبريس قدمي ملفات فولدر public للعامة
app.use(express.static('public'));

// 3. Mount the user routes on the main app instance


//4. global error middleware
app.use((error, req, res, next) => {
  console.error("💥 Global Error Caught:", error.message);

  // if the error came with a certin status code, use it, else default to 500
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    status: 'fail',
    message: error.message || 'Something went wrong in the server'
  });
});

// 4. Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000 and MVC is alive!');
});