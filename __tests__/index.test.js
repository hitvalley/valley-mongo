const ValleyMongo = require('../src/index');
const config = require('./config');

test('config', async () => {
  let vmongo = new ValleyMongo(config);
  let res = await vmongo.run();
  let url = `mongodb:\/\/${config.username}:${config.password}@${config.host}:${config.port}/admin`;
  expect(res.url).toBe(url);
  vmongo.close();
});

