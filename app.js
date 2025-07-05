import express from 'express';
import mongoose from 'mongoose';
import AuthRoutes from './src/routes/auth.js';
import UserRoutes from "./src/routes/users.js";
import dotenv from 'dotenv';
import passport from './src/config/passport.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(passport.initialize());

const authenticatedRoutes = express.Router();
authenticatedRoutes.use(passport.authenticate('jwt', { session: false }))

// Auth Routes
app.use('/api/auth', AuthRoutes);

// Routes than is required authentication
authenticatedRoutes.use('/users', UserRoutes);

// Mound authenticated routes
app.use('/api', authenticatedRoutes);

// Connect to MongoDB and start server
mongoose.connect("mongodb+srv://admin:admin@node.wzztqna.mongodb.net/?retryWrites=true&w=majority&appName=node")
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.APP_PORT, () => {
      console.log(`Server is running on port ${process.env.APP_PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



// vivansh@vivansh /var/www/node master $ node -v
// v20.11.1
// vivansh@vivansh /var/www/node master $ npm -v
// 10.2.4
// vivansh@vivansh /var/www/node master $ yarn -v
// 1.22.22
// vivansh@vivansh /var/www/node master $ 
