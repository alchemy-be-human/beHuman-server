const pool = require('../lib/utils/pool');
// const fs = require('fs');

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

    // await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

  }
  catch(err) {
    console.log(err);
  }
  finally {
    pool.end();
  }
}
