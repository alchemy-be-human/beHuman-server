const pool = require('../lib/utils/pool');
const tips = require('./tips');

run();

async function run() {

  try {
    await pool.connect();

    await Promise.all(
      tips.map(tip => {
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
