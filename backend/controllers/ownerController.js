const pool = require('../db');

exports.getStoreRatings = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const result = await pool.query(
      'SELECT u.name, u.email, r.rating FROM ratings r JOIN users u ON r.user_id = u.id WHERE r.store_id = $1',
      [storeId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStoreAverageRating = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const result = await pool.query(
      'SELECT AVG(rating)::numeric(10,2) as average FROM ratings WHERE store_id = $1',
      [storeId]
    );
    res.json({ storeId, average_rating: result.rows[0].average });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};