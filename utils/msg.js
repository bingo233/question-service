let msgObj = {
	title: '',
	code: 200,
	content: '',
	sucess: true,
	data:{}
};
module.exports = {
	// 创建消息模板
	creatMsg(title,code,content,data,sucess) {
		return Object.assign(msgObj,{title,code,content,data,sucess});
	},
	// 成功
	ok(title,content,data) {
		return this.creatMsg(title,200,content,data,true);
	},
	// 失败
	err(title,content,data) {
		return this.creatMsg(title,500,content,data,false);
	},
	logonFailure() {
		return this.creatMsg('登录失效',888);
	}
};