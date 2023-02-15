const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const cabinLayout = createProxyMiddleware({
    target: 'https://cabin-layout.adam-sv.com',
    changeOrigin: true,
  });
  [
    '/3D',
    '/auth',
    '/hasura',
    '/hasura-keycloak-connector',
    '/layout',
    '/rules',
    '/trends',
  ].forEach((path) => app.use(path, cabinLayout));

  // const windowsBox = createProxyMiddleware({
  //   target: 'http://cad3.vm.adm.airbus-sv.com:5001',
  //   changeOrigin: true,
  // });
  // ['/api'].forEach((path) => app.use(path, windowsBox));
};
