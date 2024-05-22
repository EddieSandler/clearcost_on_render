const express = require('express');
const router = express.Router();
const db = require('../db');
const cors = require('cors');

router.use(cors());

router.post('/login', (req, res) => {
  console.log('login endpoint works dude!')
  res.send("login successful");
});
router.post('/register', (req, res) => {
  console.log('register endpoint works dude!')
  res.send("register successful");
});

router.post('/data', (req, res) => {
  res.send('User will insert data into db from this endpoint- will need to add JWT (verifyToken) functionality');
});

router.put('/data/:id', (req, res) => {
  res.send('User will update user data from this endpoint- will need to add JWT (verifyToken) functionality');
});

router.delete('/data/:id', (req, res) => {
  res.send('User will delete data from db at this endpoint- will need to add JWT (VerifyToken) functionality');
});

router.get('/search', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { procedureId, facilityId } = req.query;

  if (!procedureId || isNaN(parseInt(procedureId))) {
    return res.status(400).json({ error: "Invalid or missing procedureId" });
  }
  if (!facilityId || isNaN(parseInt(facilityId))) {
    return res.status(400).json({ error: "Invalid or missing facilityId" });
  }

  const procedureIdInt = parseInt(procedureId);
  const facilityIdInt = parseInt(facilityId);

  console.log(`Querying for procedureId: ${procedureIdInt}, facilityId: ${facilityIdInt}`);

  try {
    const result = await db.query(`
      SELECT
        facilities.facility_name,
        procedures.procedure_name,
        pricing.price
      FROM
        pricing
      JOIN
        facilities ON pricing.facility_id = facilities.id
      JOIN
        procedures ON pricing.procedure_id = procedures.id
      WHERE
        pricing.procedure_id = $1
      AND
        pricing.facility_id = $2;
    `, [procedureIdInt, facilityIdInt]);

    console.log(`Query result: ${JSON.stringify(result.rows)}`);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No data found for the given procedureId and facilityId" });
    }

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/test', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { procedureId } = req.query;

  if (!procedureId || isNaN(parseInt(procedureId))) {
    return res.status(400).json({ error: "Invalid or missing procedureId" });
  }

  const procedureIdInt = parseInt(procedureId);

  console.log(`Querying for procedureId: ${procedureIdInt}`);

  try {
    const result = await db.query(`
      SELECT
        procedures.procedure_name,
        facilities.facility_name,
        pricing.price
      FROM
        pricing
      JOIN
        facilities ON pricing.facility_id = facilities.id
      JOIN
        procedures ON pricing.procedure_id = procedures.id
      WHERE
        procedures.id = $1;
    `, [procedureIdInt]);

    console.log(`Query result: ${JSON.stringify(result.rows)}`);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No data found for the given procedureId and facilityId" });
    }

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/compare', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { procedureId } = req.query;
  console.log('Comparison endpoint works Dude!')

  if (!procedureId || isNaN(parseInt(procedureId))) {
    return res.status(400).json({ error: "Invalid or missing procedureId" });
  }

  const procedureIdInt = parseInt(procedureId);

  console.log(`Querying for procedureId: ${procedureIdInt}`);

  try {
    const result = await db.query(`
      SELECT
        procedures.procedure_name,
        facilities.facility_name,
        pricing.price
      FROM
        pricing
      JOIN
        facilities ON pricing.facility_id = facilities.id
      JOIN
        procedures ON pricing.procedure_id = procedures.id
      WHERE
        procedures.id = $1;
    `, [procedureIdInt]);

    console.log(`Query result: ${JSON.stringify(result.rows)}`);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No data found for the given procedureId and facilityId" });
    }

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
