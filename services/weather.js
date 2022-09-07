require("dotenv").config();
const requestPromise = require("request-promise");

async function weather(ip) {
  try {
    let location = "korea";
    const env = process.env.NODE_ENV;
    if (env !== undefined && env !== "test" && env !== "development") {
      location = ip;
    }
    const options = {
      url: `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${location}&lang=ko`,
      method: "GET",
      headers: { "content-type": "application/json" },
    };

    let res = await requestPromise(options);
    res = JSON.parse(res);
    return res.current.condition.text;
  } catch (err) {
    return null;
  }
}

module.exports = weather;
