const pool = require('../utils/pool');


module.exports = class Link {
  id;
  url;

  constructor(row) {
    this.id = row.id;
    this.url = row.url;
  }

  static async insert(link) {
    const { rows } = await pool.query(
      'INSERT INTO links (url) VALUES ($1) RETURNING *',
      [link.url]
    );
    return new Link(rows[0]);
  }

  static async getRandom() {
    const { rows } = await pool.query(
      `SELECT * FROM links 
      ORDER BY RANDOM()
      LIMIT 1`,
    );
    return new Link(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM links WHERE id=$1',
      [id]
    );
    if(!rows[0]) throw new Error(`No link with id ${id}`);
    return { ...new Link(rows[0]) };
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM links'
    );
    return rows.map(row => new Link(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM links WHERE id=$1 RETURNING *',
      [id]
    );
    if(!rows[0]) throw new Error(`You crazy?! Ain't no links with id ${id} here.`);
    return new Link(rows[0]);
  }

};
