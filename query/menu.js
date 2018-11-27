const queryUtils = require('../utils/queryUtils');
const roleSql = require('./role');

module.exports = {
	getMenusByUser(param, callback){
		roleSql.getRoleByIds(param,roles => {
			const menus = [];
			if (roles){
				roles.forEach(item => {
					const menuIds = item.menu_id;
					if (menuIds) {
						menus.push(...menuIds.split(';'));
					}
				});
			}
			
			queryUtils(['menu-sql','findByIds'], [menus]).then(res => {
				callback(res);
			});

		});
		
	}
};