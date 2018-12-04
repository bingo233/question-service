const queryUtils = require('../utils/queryUtils');

module.exports = {
	// 根据id 集合查询角色
	getRoleByIds(param, callback){
		queryUtils(['role-sql','findByIds'], param).then(res => {
			callback(res);
		});
	},
	// 查询角色
	queryRoleList(param, callback) {
		queryUtils(['role-sql', 'queryRoleList'], param).then(res => {
			callback(res)
		})
	}
};