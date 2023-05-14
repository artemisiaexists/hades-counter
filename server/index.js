const express = require("express");

const PORT = process.env.PORT || 3001;

const cors = require("cors");
const app = express();
app.use(cors());
const fs = require("fs")

let data = [];
fs.readFile(
      "server/data.json",
      (err, res) => {
            if(!err){
                data = JSON.parse(res);
            } else {
                console.log(err)
            }
      }
)

app.get("/counter", (req, res) => {
    const counter = data.counter;
    res.send({counter})
});

app.post("/counter", (req, res) => {
    const add = req.headers.value;
    const index = req.headers.index;
    dataToChange = data.counter[index];
    var spent = parseInt(dataToChange.spent);
    spent += parseInt(add);
    dataToChange.spent = spent;
    data.counter[index] = dataToChange;
    fs.writeFile(
        "server/data.json",
        JSON.stringify(data, null, 2),
        (err) => {console.log(err)})
    const counter = data.counter;
    res.send({counter})
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
