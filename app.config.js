var ip = require('ip');

const config = {
  server: {
    host: ip.address(), // IP 地址
    port: 9200, // 端口号
  },
  copyFile: [

  ],
  html: [
    { name: 'index', title: 'Remote Dev Tools', entry: './src/index' },
  ],
};

module.exports = config;
