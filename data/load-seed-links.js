const pool = require('../lib/utils/pool');
const linksData = require('./links-data');

run();
async function run() {
  try {
    await pool.connect();
    await Promise.all(
      linksData.map(url => {
        return pool.query(`
          INSERT INTO links (url)
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
