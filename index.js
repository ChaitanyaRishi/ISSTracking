const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({ extend: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", { times: [] });
});

app.post("/getOverHeadLocations", function (req, res) {
  const lat = req.body.latitude;
  const lon = req.body.longitude;
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const times = JSON.parse(body).response.map(
          (i) => new Date(i.risetime * 1000)
        );
        res.render("index", {
          times,
        });
      }
    }
  );
});

var server = app.listen(5000, function () {
  console.log("Node server is running.. in port 5000");
});
