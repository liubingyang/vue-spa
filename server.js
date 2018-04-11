var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./build/webpack.config.js'),
    express=require('express'),
    consolidate = require('consolidate'),
	  swig=require('swig'),
    path=require('path'),
    app=express();
    
var compiler = webpack(webpackDevConfig);


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './'));

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: 'http://localhost:3000/',
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));


app.listen(3000, function(){
  console.log('App (dev) is now running on port 3000!');
});

//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

app.use('/',require("./service/get"))
app.use('/juejinResources',require('./service/juejinResources'))


