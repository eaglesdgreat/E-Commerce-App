const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3080,
  jwtSecret: process.env.JWT_SECRET || 'VIN FA5B 3EC1 8452 8381 663',
  mongoUri: process.env.MONGO_URI || (process.env.HOST || 'mongodb://') + (process.env.IP || 'localhost') + ':'
    + (process.env.Port || '27017') + '/onlineMall',
}

export default config
