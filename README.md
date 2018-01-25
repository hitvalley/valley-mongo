# valley-mongo
mongo driver with valley-module

## 使用

### 引入

```
npm i valley-mongo
```

### 代码

```
const ValleyMongo = require('valley-mongo');
const ValleyServer = require('valley-server');

const mongo = new ValleyMongo({
  host,        // mongo 域
  port,        // mongo 端口
  username,    // 用户名
  password,    // 用户密码
  dbname       // 数据名称
});

const server = new ValleyServer();
server.use('mongo', mongo);
server.listen(3000);
```

### 链接

* [!valley-server](https://github.com/hitvalley/valley-server)
* [!valley-mongo](https://github.com/hitvalley/valley-module)

## run test

### 配置 config

设置 __tests__/config.js，如下
```javascript
module.exports = {
  host,        // mongo 域
  port,        // mongo 端口
  username,    // 用户名
  password     // 用户密码
};
```

### 执行

```
npm test
```
