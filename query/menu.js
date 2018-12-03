const queryUtils = require('../utils/queryUtils');
const roleSql = require('./role');
const UUID = require('uuid')

module.exports = {
	// 获取用户菜单
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
	},
	// 获取所有菜单用于菜单管理
	getMenus(callback) {
		queryUtils(['menu-sql', 'queryAll']).then(res => {
			callback(res)
		})
	},
	// 保存菜单信息
	saveMenus(params, callback) {
		if (!params.id) {
			params.id = UUID.v1();
            queryUtils(['menu-sql', 'saveMenu'], params).then(res => {
                callback(res)
            })
		} else {
            queryUtils(['menu-sql', 'updateMenu'], [params,{id:params.id}]).then(res => {
                callback(res)
            })
		}

	},
	// 根据id 删除菜单
	deleteMenu(params, callback) {
		queryUtils(['menu-sql', 'deleteMenu'], params).then(res => {
			callback(res)
		})
	}
};