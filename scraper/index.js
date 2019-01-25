const request = require("request-promise").defaults({
  headers: {
    Authorization: "apikey 8ea31c48-95c3-4bcf-9db1-d6ada47565f2",
    NordApiVersion: 1
  }
});
const fs = require("fs");

async function scrape() {
  const url =
    "https://query.ecommerce.api.nordstrom.com/api/queryresults/keywordsearch/?top=10&IncludeFacets=false&Keyword=red%20dresses";
  const json = await request.get(url);
  fs.writeFileSync("./result.json", json);
}

scrape();
