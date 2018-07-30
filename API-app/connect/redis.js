var Redis = require('ioredis');
 
/*var cluster = new Redis.Cluster([{
  port: 34511,
  host: '127.0.0.1'
}, {
  port: 34502,
  host: '127.0.0.1'
},{
  port: 34512,
  host: '127.0.0.1'
}]);*/
 
var cluster = new Redis('127.0.0.1') ;
//切换redis库5，默认为1
cluster.select(0);

module.exports = cluster;