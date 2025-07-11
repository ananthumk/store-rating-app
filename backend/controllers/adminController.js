const pool = require('../db');

exports.getStats = async (req, res) => {
  try {
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const stores = await pool.query('SELECT COUNT(*) FROM stores');
    const ratings = await pool.query('SELECT COUNT(*) FROM ratings');
    res.json({
      total_users: users.rows[0].count,
      total_stores: stores.rows[0].count,
      total_ratings: ratings.rows[0].count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersByRole = async (req, res) => {
  const role = req.query.role;
  try {
    const result = await pool.query('SELECT * FROM users WHERE role = $1', [role]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserDetails = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const ratings = await pool.query('SELECT * FROM ratings WHERE user_id = $1', [userId]);
    res.json({ user: user.rows[0], ratings: ratings.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};