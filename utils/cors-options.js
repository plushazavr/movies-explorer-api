const corsOptions = {
  origin: [
    'http://diploma.kazantseva.nomoredomains.sbs',
    'https://diploma.kazantseva.nomoredomains.sbs',
    'http://api.diploma.kazantseva.nomoredomains.sbs',
    'https://api.diploma.kazantseva.nomoredomains.sbs',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
};

module.exports = corsOptions;
