const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const codvid = require("./cod19-info");

const app = express();
const port = process.env.PORT || 2000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//this is the way to tell to express that use that folder to get the static
app.use(express.static("../public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/country-info", (req, res) => {
  let country = req.query.country;
  if (!country)
    return res.send({
      error: "must pass a country"
    });
  codvid.search(country, country_stat => {
    res.send({
      info: country_stat
    });
  });
});

// app.post('/', (req, res) => {
//     let country = req.body.country
//     if (!country) return res.send({
//         error: 'must pass a country'
//     })
//     codvid.search(country, (country_stat) => {
//         stats = country_stat
//         //stats.push(country)
//         res.redirect('/')

//     })

// })

// app.post('/country-info', (req, res) => {
//     country = req.body.country;

//     res.redirect('/country-info')

// })

app.listen(port, console.log("listen on port " + port));
