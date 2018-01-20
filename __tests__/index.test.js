const ValleyMongo = require('../src/index');

test('config', async () => {
  let vmongo = new ValleyMongo();
  let res = await vmongo.run();
  // console.log(res)
  expect(res.url).toBe('mongodb://localhost:27017/admin');
  vmongo.close();
});

