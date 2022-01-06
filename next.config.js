module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.modules.push(path.resolve('./'))

    return config
  }
}
const path = require('path')
