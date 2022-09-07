require("dotenv").config();
const requestPromise = require("request-promise");

async function weather() {
  try {
    const options = {
      url: `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=seoul&lang=ko`,
      method: "GET",
      headers: { "content-type": "application/json" },
    };

    let res = await requestPromise(options);
    res = JSON.parse(res);
    return res.current.condition.text;
  } catch (err) {
    console.log(err);
  }
}

module.exports = weather;
