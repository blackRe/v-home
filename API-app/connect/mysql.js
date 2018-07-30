var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : '127.0.0.1',
  user            : 'root',
  password        : 'kLP551319zxc',
  database        : 'helpFarmers'
});

module.exports = pool;