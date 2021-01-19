const pool = require('../lib/utils/pool');

run();

async function run() {

  try {
    await pool.connect();

    await pool.query(`
        DROP TABLE IF EXISTS links CASCADE;
        DROP TABLE IF EXISTS tips;
        `);
  }
  catch(err) {
    console.log(err);
  }
  finally {
    pool.end();
  }
}
