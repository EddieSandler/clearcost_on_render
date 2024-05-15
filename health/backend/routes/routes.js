const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const cors = require('cors');




router.get('/user', (req, res) => {    //verifyToken
  // Implement logic to insert data into database
  res.send("this endpoint will retrieve a user's profile");
});


router.post('/data', (req, res) => {    //verifyToken
  // Implement logic to insert data into database
  res.send('User will insert data into db from this endpoint- will need to add JWT (verifyToken) functionality');
});



router.put('/data/:id', (req, res) => {    //verifyToken
  res.send('User will update user data from this endpoint- will need to add JWT (verifyToken) functionality');
});

router.delete('/data/:id', (req, res) => {     //verifyToken, isAdmin,
  res.send('User will delete  data from  db at this endpoint- will need to add JWT (VerifyToken)functionality');
});

router.get('/search', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { procedureId, planId } = req.query;  // Extract query parameters

  try {
    const result = await db.query(`
        SELECT
            procedure.identifier_description AS "procedure",
            price.price AS price,
            facility.name AS facility,
            plan.name AS plan,
            payor.name AS payor
        FROM procedure
        JOIN price ON procedure.id = price.procedure_id
        JOIN facility ON price.facility_id = facility.id
        JOIN plan ON price.plan_id = plan.id
        JOIN payor ON plan.payor_id = payor.id
        WHERE procedure.id = $1 AND price.plan_id = $2;
      `, [procedureId, planId]);
    res.json(result.rows);


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }

});
router.get('/test', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");


  res.send('endpoint working');


});



module.exports = router;
