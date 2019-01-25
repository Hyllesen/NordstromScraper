var express = require("express");
var app = express();
const request = require("request-promise").defaults({
  headers: {
    Authorization: "apikey 8ea31c48-95c3-4bcf-9db1-d6ada47565f2",
    NordApiVersion: 1
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/nordstrom", async (req, res, next) => {
  const numberOfTop = req.query.top;
  const keyword = encodeURIComponent(req.query.keyword);
  const url =
    "https://query.ecommerce.api.nordstrom.com/api/queryresults/keywordsearch/?top=10&IncludeFacets=false&Keyword=red%20dresses";
  const json = await request.get(url);
  return json;
});
