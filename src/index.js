const ValleyModule = require('valley-module');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

function connectMDB(url) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    })
  });
}

class ValleyMongo extends ValleyModule {
  constructor(input) {
    super(input);
    input = input || {};
    this.host = input.host || '127.0.0.1';
    this.port = input.port || '27017';
    this.username = input.username;
    this.password = input.password;
    this.dbname = input.dbname || 'admin';
    this.db = null;
  }
  prepare() {
    this.use('prepare-config', async next => {
      if (this.username) {
        this.context.url = `mongodb:\/\/${this.username}:${this.password}@${this.host}:${this.port}/${this.dbname}`;
      } else {
        this.context.url = `mongodb:\/\/${this.host}:${this.port}/${this.dbname}`;
      }
      await next();
    });
    this.use('prepare-db', async next => {
      const db = await connectMDB(this.context.url).catch(err => this.throwFn(err));
      this.context.db = db;
      await next();
    });
  }
  close() {
   this.context.db && this.context.db.close();
  }
}

module.exports = ValleyMongo;

