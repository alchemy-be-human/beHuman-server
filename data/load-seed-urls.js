const pool = require('../lib/utils/pool');
const urlsData = require('./urls-data');

run();

async function run() {

  try {
    await pool.connect();

    await Promise.all(
      urlsData.map(url => {
        return pool.query(`
                    INSERT INTO urls (url)
                    VALUES ($1)`,
        [url.url]);
      })
    );
  } 
  catch(err) {
    console.log(err);
  }
  finally {
    pool.end();
  }
}
