const ValleyMongo = require('../src/index');
const config = require('./config');

test('config', async () => {
  let vmongo = new ValleyMongo(config);
  let res = await vmongo.run();
  let url = `mongodb:\/\/${config.username}:${config.password}@${config.host}:${config.port}/admin`;
  expect(res.url).toBe(url);
  vmongo.close();
});

test('config no auth', async () => {
  let vmongo = new ValleyMongo({
    host: config.host,
    port: config.port
  });
  let res = await vmongo.run();
  let url = `mongodb:\/\/${config.host}:${config.port}/admin`;
  expect(res.url).toBe(url);
  vmongo.close();
});

test('config error', async () => {
  let vmongo = new ValleyMongo();
  vmongo.host = 'nohost';
  let res = await vmongo.run().catch(err => err);
  let errorMsg = 'non-error thrown: MongoNetworkError: failed to connect to server [nohost:27017] on first connect [MongoNetworkError: getaddrinfo ENOTFOUND nohost nohost:27017]';
  expect(res.message).toBe(errorMsg);
});

