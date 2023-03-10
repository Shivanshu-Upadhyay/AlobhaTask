const DbConnect = require("./database");
const express = require("express");
const csvInsert = require("./model");
const AllValidator = require("./validate");
const { parse } = require("csv-parse");
const fs = require("fs");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
// cors error
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
// Database And Port
DbConnect();
app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:" + PORT);
});
// CSV to JSON
const jsonData = [];
fs.createReadStream("test-csv.csv")
.pipe(parse({ columns: true }))
.on("data", (data) => {jsonData.push(data);
}).on("error", (err) => console.log(err));
// API End Point
app.post("/save", async (req, res) => {
  try {
    jsonData.forEach(async (item) => {
      let data = await AllValidator.fieldValide( item.Email,item.Phone,item.Pincode);
      if (data) {
        let insertedData = await csvInsert.create(item);
        console.log(insertedData)
      }
    });
    res.status(200).json({ message: "Data Inserted✅"});
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post('/allData',async(req,res)=>{
    let data = await csvInsert.find()
    res.status(200).json(data)
})
