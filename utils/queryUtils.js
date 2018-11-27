const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const sqlDir = path.resolve(__dirname, '../conf/sql/');
const confPath = path.resolve(__dirname, '../conf/config.json');

//=========创建mysql数据库连接池==============//
const pool = mysql.createPool(JSON.parse(fs.readFileSync(confPath, 'utf-8')).database);

module.exports = function query([fileName,key], param = {}) {

	const sqlFilePath = path.resolve(sqlDir, `${fileName}.json`);
	let sqlObj = fs.readFileSync(sqlFilePath, 'utf-8');
	sqlObj = JSON.parse(sqlObj);
	const sql = sqlObj[key];
  
	return new Promise((resolve, reject) => {
		// 获取数据库连接
		pool.getConnection((err, connection) => {
			if (err) {
				// reject(err);
				throw err;
			} else {
				console.log(param,'===sql查询参数');
				// 查询数据库
				var ss = connection.query( sql, param, function(err, rows){
					console.log(ss.sql);
					if (err) {
						// reject(err);
						throw err;
					}else{
						resolve(rows);
					}
				});
				connection.release();
			}
		});
	}).catch(err => {
		throw err;
	});
};