const dotenv = require('dotenv');
const Joi = require('joi');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const envSchema = Joi.object().keys({
  // app
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(3000),

  CLIENT_URL: Joi.string().default('http://localhost:3000'),

  // jwt
  JWT_SECRET: Joi.string().required().description('JWT Secret key'),
  JWT_EXPIRES_IN: Joi.string().default('3600').description('JWT Token Expire'),

  // database
  DB_USER: Joi.string().required().description('Database User'),
  DB_PASSWORD: Joi.string().required().description('Database password'),
  DB_DIALECT: Joi.string().required().description('Database dialect'),
  DB_NAME: Joi.string().required().description('Database name'),
  DB_HOST: Joi.string().required().description('Database host')
});

const { value: envValue, error } = envSchema
  .prefs({
    errors: { label: 'key' }
  })
  .validate(process.env, { allowUnknown: true });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envValue.NODE_ENV,
  port: envValue.PORT,
  clientUrl: envValue.CLIENT_URL,
  jwt: {
    secret: envValue.JWT_SECRET,
    expireIn: Number(envValue.JWT_EXPIRES_IN) * 24 * 60 * 60
  },
  db: {
    username: envValue.DB_USER,
    password: envValue.DB_PASSWORD,
    database: envValue.DB_NAME,
    host: envValue.DB_HOST,
    dialect: envValue.DB_DIALECT
  }
};
