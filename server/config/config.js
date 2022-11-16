const config = {
  // DB_HOST: "192.168.34.113",
  // DB_PORT: "3306",
  // DB_USERNAME: "appuser",
  // DB_PASSWORD: "#E1wM9uQ",
  // DB_NAME: "payamtdb",

  DB_HOST: "localhost",
  DB_PORT: "3306",
  DB_USERNAME: "root",
  DB_PASSWORD: "",
  DB_NAME: "bankconnect",

  // JWT DATA
  JWT_EXPIRY: "1h",
  JWT_ALGO: "sha512",
  JWT_SECRET: "UBankConnect.15.05.22",
  PWD_SALT: 10,
};

module.exports = config;