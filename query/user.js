const queryUtils = require('../utils/queryUtils');

module.exports = {
	checkUser(param, callback){
		queryUtils(['user-sql','findByAccAndPwd'], param).then(res => {
			callback(res[0]);
		});
	},
	queryUserByPage(aram, callback) {
	
	}
};