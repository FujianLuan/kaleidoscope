module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      host: '192.168.1.4',
      port: 10086,
      proxy: {
        '/app': {
          target: 'http://api-app.smartisan.com',  // 服务端地址
          changeOrigin: true,
          bypass: function (req, res, proxyOptions) {
            // console.log('proxy bypass');
            // console.log(req);
            // console.log(res);
          }
        }
      }
    },
  }
}
