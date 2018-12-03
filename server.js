const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var FileStore = require('session-file-store')(session);
const msg = require('./utils/msg');

const app = express();

// =====session===== //
app.use(session({
	// name: 'em_question',
	secret: 'chyingp',  // 用来对session id相关的cookie进行签名
	store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
	saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
	resave: false,//,  // 是否每次都重新保存会话，建议false
	// httpOnly: false,
	cookie: {
		maxAge: 3600 * 1000  // 有效期，单位是毫秒
	}
}));
// app.use(express.favicon());

// =====路由===== //
const routers = require('./routes/index');
const login = require('./routes/login');
const menus = require('./routes/menus');
const uplaod = require('./routes/upload')

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	res.header('X-Powered-By',' 3.2.1');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

// =====登录拦截====== //
//登录拦截器，必须放在静态资源声明之后、路由导航之前
app.use(function (req, res, next) {
	var url = req.originalUrl;
	url = url.split('?')[0];

	if (url != '/login/loginCheck' && !req.session.user) {
		return res.json(msg.logonFailure());
	}
	next();
});

app.use('/',routers);
app.use('/login', login);
app.use('/menus', menus);
app.use('/upload', uplaod);

// 把请求参数格式化为json
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// 静态资源控制
app.use(express.static(__dirname+'/public'))

const server = app.listen(3000 , () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log('服务启动，访问地址为 http://%s:%s', host, port);
});