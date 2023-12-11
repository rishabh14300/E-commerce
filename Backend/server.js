// server.js (Express server)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // User model
// const Razorpay = require('razorpay');
const stripe = require('stripe')('sk_test_51OL3XgSDLPzwG5nvbvoDESzTDOPAHseTgXoJRAkx0JvvgSWbt9N2NnVyzv5FpcZUdFOrJQ9wLlzaXue2oFc69HxZ00LnZdZhjT');

const app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors());

// MongoDB connection setup
mongoose.connect('mongodb://0.0.0.0:27017/User');
console.log("DB Connected");

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 6);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_secret_key');
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});



// Stripe checkout

app.post('/checkout', async (req, res) => {
  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items:req.body.lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
  });
  res.json({ id: session.id });
  } catch(error) {
    console.error("eroor",error);
  }
  
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
