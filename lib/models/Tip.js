const pool = require('../utils/pool');

module.exports = class Tip {
    id;
    tip;

    constructor(row) {
      this.id = row.id;
      this.tip = row.tip;
    }

    static async insert({ tip }) {
      const { rows } = await pool.query(
        'INSERT INTO tips (tip) VALUES ($1) RETURNING *',
        [tip]
      );

      return new Tip(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM tips'
      );

      return rows.map(row => new Tip(row));
    }

    static async update(id, { tip }) {
      const { rows } = await pool.query(
        `UPDATE tips
          SET
            tip=$1
          WHERE id=$2
          RETURNING *`,
        [tip, id]
      );

      return new Tip(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM tips WHERE id=$1 RETURNING *',
        [id]
      );

      return new Tip(rows[0]);
    }

};
