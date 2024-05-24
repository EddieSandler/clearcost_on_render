const express = require('express');
const router = express.Router();
const db = require('../db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const {authenticateToken,checkAdmin} = require('../middleWare/auth.js');

router.use(cors());

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(`SELECT * FROM users where username = $1`, [username]);
    if (result.rows.length === 0) {
      return res.status(400).send('User not found');
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).send('Invalid Credentials');

    }

    const token = jwt.sign({
      id: user.id,
      username: user.username,
      insuranceCompany: user.insurance_company,
      copayment: user.copayment,
      coinsurance: user.coinsurance,
      deductible: user.deductible
    }, SECRET_KEY, { expiresIn: '1h' });

    console.log('login successful, token:', token);
    return res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).send('Error logging in');

  }



});





router.post('/register', async (req, res) => {
  const { username, password, insuranceCompany, copayment, coinsurance, deductible } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10); // Hash the password
    const result = await db.query(
      'INSERT INTO users (username, password_hash, insurance_company, copayment, coinsurance, deductible) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, password_hash, insuranceCompany, copayment, coinsurance, deductible]
    );

    res.status(200).send(result.rows[0]);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Error registering user');
  }


});

router.get('/admin',(req, res, next) => {
try {
  const token = req.body.token;
  const data= jwt.verify(token,SECRET_KEY)

  return res.json({msg:"Signed In as admin"})
}
  catch(e){
    return next(e)

  }

});



// router.post('/data', (req, res) => {
//   res.send('User will insert data into db from this endpoint- will need to add JWT (verifyToken) functionality');
// });

// router.put('/data/:id', (req, res) => {
//   res.send('User will update user data from this endpoint- will need to add JWT (verifyToken) functionality');
// });

// router.delete('/data/:id', (req, res) => {
//   res.send('User will delete data from db at this endpoint- will need to add JWT (VerifyToken) functionality');
// });




router.get('/compare', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { procedureId } = req.query;
  console.log('Comparison endpoint works Dude!');

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














// router.get('/test', async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   const { procedureId } = req.query;

//   if (!procedureId || isNaN(parseInt(procedureId))) {
//     return res.status(400).json({ error: "Invalid or missing procedureId" });
//   }

//   const procedureIdInt = parseInt(procedureId);

//   console.log(`Querying for procedureId: ${procedureIdInt}`);

//   try {
//     const result = await db.query(`
//       SELECT
//         procedures.procedure_name,
//         facilities.facility_name,
//         pricing.price
//       FROM
//         pricing
//       JOIN
//         facilities ON pricing.facility_id = facilities.id
//       JOIN
//         procedures ON pricing.procedure_id = procedures.id
//       WHERE
//         procedures.id = $1;
//     `, [procedureIdInt]);

//     console.log(`Query result: ${JSON.stringify(result.rows)}`);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "No data found for the given procedureId and facilityId" });
//     }

//     res.json(result.rows);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// router.get('/search', async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   const { procedureId, facilityId } = req.query;

//   if (!procedureId || isNaN(parseInt(procedureId))) {
//     return res.status(400).json({ error: "Invalid or missing procedureId" });
//   }
//   if (!facilityId || isNaN(parseInt(facilityId))) {
//     return res.status(400).json({ error: "Invalid or missing facilityId" });
//   }

//   const procedureIdInt = parseInt(procedureId);
//   const facilityIdInt = parseInt(facilityId);

//   console.log(`Querying for procedureId: ${procedureIdInt}, facilityId: ${facilityIdInt}`);

//   try {
//     const result = await db.query(`
//       SELECT
//         facilities.facility_name,
//         procedures.procedure_name,
//         pricing.price
//       FROM
//         pricing
//       JOIN
//         facilities ON pricing.facility_id = facilities.id
//       JOIN
//         procedures ON pricing.procedure_id = procedures.id
//       WHERE
//         pricing.procedure_id = $1
//       AND
//         pricing.facility_id = $2;
//     `, [procedureIdInt, facilityIdInt]);

//     console.log(`Query result: ${JSON.stringify(result.rows)}`);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "No data found for the given procedureId and facilityId" });
//     }

//     res.json(result.rows);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });