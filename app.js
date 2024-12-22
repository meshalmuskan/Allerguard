const express = require('express');
const dotenv = require('dotenv');//need to search
const helmet = require('helmet');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/connection');
const authRoutes = require('./routes/authroutes');
const contactRoutes = require('./routes/contactroutes');
const productRoutes = require('./routes/productroute'); // Correct import
const path = require('path');
const productController = require('./controllers/productController');
const reviewRoutes = require('./routes/reviewroutes');
dotenv.config();

const app = express();
const session = require('express-session');

// Use session middleware
app.use(
    session({
        secret: 'your_secret_key', // Replace with a strong secret
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Use `true` if using HTTPS
    })
);

// Set up middleware
app.set('view engine', 'ejs');
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('Session data:', req.session);
  next();
});
// Middleware for protected routes
app.use('/api/protected', authMiddleware);

// Use routes
app.use(authRoutes);
app.use(contactRoutes);
app.use(productRoutes); // Use product routes
app.use(reviewRoutes);
// Routes for rendering EJS templates
app.get('/', productController.homeProducts);

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});
app.get('/services',(req,res)=>{
  res.render('services',{title: 'Services'})
});
app.get('/contactform', (req, res) => {
  res.render('contactform', { title: 'Contact Form' });
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' });
});


// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
