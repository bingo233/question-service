const queryUtils = require('../utils/queryUtils');

module.exports = {
	getRoleByIds(param, callback){
		queryUtils(['role-sql','findByIds'], param).then(res => {
			callback(res);
		});
	}
};