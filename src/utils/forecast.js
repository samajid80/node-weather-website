const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/fdbc816387a4b860d73352175c52b9cf/" +
    latitude +
    "," +
    longitude +
    "?units=si";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find Location.", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " The high temperature today is " +
          body.daily.data[0].temperatureHigh +
          " with the low of " +
          body.daily.data[0].temperatureLow +
          ". It is currently " +
          body.currently.temperature +
          " degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
