export default () => ({
  env: process.env.APP_ENV || 'local',
  port: parseInt(process.env.APP_PORT, 10) || 8080,
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING
});
