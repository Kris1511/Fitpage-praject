const express = require("express");
const cors = require("cors");
const resourceData = require("./data");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// app.get("/api/data", (req, res) => {
//   try {
//     fs.readFile("./data.json", (err, data) => {
//       if (err) {
//         throw new Error("Error reading data from file");
//       }
//       const jsonData = JSON.parse([data][criteria].text);
//       console.log("jsonData:", jsonData);
//       res.json(jsonData).status(200);
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .send({
//         message: err.message || "Error occurred while retrieving the data",
//       });
//   }
// });


app.get("/api/data", (req, res) => {
  try {
    fs.readFile("./data.json", (err, data) => {
      if (err) {
        throw new Error("Error reading data from file");
      }
      const jsonData = JSON.parse(data); // Parse the JSON data
      const criteriaTextOnly = jsonData.map(item => ({
        id: item.id,
        name: item.name,
        tag:item.tag,
        criteria: item.criteria.map(criterion => criterion.text) // Extract only the text from criteria
      }));
      console.log("jsonData:", criteriaTextOnly);
      res.json(criteriaTextOnly).status(200);
    });
  } catch (err) {
    res
      .status(500)
      .send({
        message: err.message || "Error occurred while retrieving the data",
      });
  }
});
