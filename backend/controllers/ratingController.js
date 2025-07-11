const pool = require('../db');

exports.addRating = async (req, res) => {
  const { userId, storeId, rating } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3) RETURNING *',
      [userId, storeId, rating]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRating = async (req, res) => {
  const ratingId = req.params.id;
  const { rating } = req.body;
  try {
    const result = await pool.query(
      'UPDATE ratings SET rating = $1 WHERE id = $2 RETURNING *',
      [rating, ratingId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
