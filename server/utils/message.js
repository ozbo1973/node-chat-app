const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: Date.now()
});

const generateLocationMessage = (from, lat, lng) => ({
  from,
  url: `http://maps.google.com?q=${lat},${lng}`,
  createdAt: Date.now()
});

module.exports = { generateMessage, generateLocationMessage };
