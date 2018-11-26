const moment = require("moment");

const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: moment().valueOf()
});

const generateLocationMessage = (from, lat, lng) => ({
  from,
  url: `http://maps.google.com?q=${lat},${lng}`,
  createdAt: moment().valueOf()
});

module.exports = { generateMessage, generateLocationMessage };
