var express = require("express");
const cors = require("cors");
var app = express();
app.use(cors());
const request = require("request-promise").defaults({
  headers: {
    Authorization: "apikey 8ea31c48-95c3-4bcf-9db1-d6ada47565f2",
    NordApiVersion: 1
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

app.get("/nordstrom", async (req, res, next) => {
  const numberOfTop = req.query.top;
  const keyword = encodeURIComponent(req.query.keyword);
  const url = `https://query.ecommerce.api.nordstrom.com/api/queryresults/keywordsearch/?top=${numberOfTop}&IncludeFacets=false&Keyword=${keyword}`;
  console.log(url);
  const json = await request.get(url);
  console.log(json);
  res.setHeader("Content-Type", "application/json");
  res.send(json);
});
