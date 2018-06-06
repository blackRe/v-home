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
 
var cluster = new Redis() 

module.exports = cluster;