require('dotenv').config()

const envFormat = ['MONGODB_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET']

envFormat.forEach((vari) => {
  if(!process.env[vari]){
    throw new Error(`Required environment variable: ${vari}`)
  }
})

module.exports = Object.freeze({
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5008,
  dbUrl: process.env.MONGODB_URI,
  jwtString: process.env.JWT_SECRET,
  jwtRefresh: process.env.JWT_REFRESH_SECRET
})