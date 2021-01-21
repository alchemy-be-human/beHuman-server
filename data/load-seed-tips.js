const pool = require('../lib/utils/pool');
const tipsData = require('./tips-data');

run();
async function run() {
  try {
    await pool.connect();
    await Promise.all(
      tipsData.map(tip => {
        return pool.query(`
                    INSERT INTO tips (tip)
                    VALUES ($1)`,
        [tip.tip]);
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
