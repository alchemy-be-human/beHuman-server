const pool = require('../lib/utils/pool');

run();

async function run() {

  try {

    await pool.connect();

    await pool.query(`
          CREATE TABLE links (
          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          url TEXT NOT NULL 
        );
        
        CREATE TABLE tips (
          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          tip TEXT NOT NULL
        );
        `);
  }
  catch(err) {
    console.log(err);
  }
  finally {
    pool.end();
  }
}
