const {Client}=require("pg")
let DB_URI="medical_pricing"

let db = new Client({
  host : "/var/run/postgresql",
  database :  DB_URI
})

db.connect()

module.exports=db;