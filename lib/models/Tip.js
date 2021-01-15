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


};
