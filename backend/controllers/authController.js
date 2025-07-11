const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;


exports.registerUser = async (req, res) => {

    const { name, email, password, address, role } = req.body;

    if (name.length < 20 || name.length > 60) {
        return res.status(400).json({ error: 'Name must be between 20 and 60 characters.' });
    }
    if (address.length > 400) {
        return res.status(400).json({ error: 'Address must be less than or equal to 400 characters.' });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must be 8-16 characters, include one uppercase letter and one special character.' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
  
  try {
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    console.log(existingUser.rows[0])
    if(existingUser.rows[0]){
        return res.status(401).json({error: 'Already email exist'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, address, role]
    );
    const user = result.rows[0]
    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'})
    res.status(200).json({ message: 'User registered', token: token, user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
