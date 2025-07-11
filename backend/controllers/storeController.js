const pool = require('../db');

exports.getStores = async (req, res) => {
  try {
    const result = await pool.query(`SELECT 
  stores.id, 
  stores.name, 
  stores.email, 
  stores.address,
  ROUND(AVG(ratings.rating), 1) AS average_rating
FROM stores
LEFT JOIN ratings ON stores.id = ratings.store_id
GROUP BY stores.id ORDER BY stores.id ;
      `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addStore = async (req, res) => {
  const { name, email, address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO stores (name, email, address) VALUES ($1, $2, $3) RETURNING *',
      [name, email, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
