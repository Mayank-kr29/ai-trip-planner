import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import supabase from '../supabaseClient.js';

export const register = async (req, res) => {
  try {
    const { name, dob, email, phone, username, password } = req.body;
    
    if (!name || !dob || !email || !phone || !username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already registered
    const { data: existingEmail } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Check if username already taken
    const { data: existingUsername } = await supabase
      .from('users')
      .select('id')
      .eq('username', username.toLowerCase())
      .maybeSingle();

    if (existingUsername) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: user, error } = await supabase
      .from('users')
      .insert([{
        name,
        dob,
        email: email.toLowerCase(),
        phone,
        username: username.toLowerCase(),
        password: hashedPassword
      }])
      .select('id, name, dob, email, phone, username')
      .single();

    if (error || !user) {
      console.error('Supabase Registration Error:', error);
      return res.status(500).json({ message: 'Failed to create user in database: ' + (error?.message || '') });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
        dob: user.dob
      }
    });

  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).json({ message: 'Server error while registering: ' + error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username.toLowerCase())
      .maybeSingle();

    if (error || !user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
        dob: user.dob
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error while logging in: ' + error.message });
  }
};
