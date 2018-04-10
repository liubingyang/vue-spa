var http = require('https');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var express = require('express');
var router = express.Router();

var url = "https://www.battlenet.com.cn/forums/zh/wow/2661594/";
var log = console.log;
var arr = [];

let openTime=new Date();
let openingTime='';
let userInformations=[];
(function(){
	setInterval(function(){
		openingTime=new Date()-openTime;
	},1000)
})()
router.get('/userInformations', function(req, res) {
       	res.status(200);
		res.json(userInformations)
});
router.get('/openingTime', function(req, res) {
       	res.status(200);
		res.json(openingTime)
});
router.get('/', function(req, res) {
	req.headers.lastLoadTime=new Date().getTime();
	userInformations.push(req.headers);
	log('获取到/,返回首页')
	res.type('text/html');
	res.render('index');
});

router.get('/getList',function(req,res,next){
	log('获取到/getList')
	//采用http模块向服务器发起一次get请求      
	ajax().then(function($){
		var a = {};
		//获取列表href。。有重复的，做了去重
		$('a.ForumTopic').each(function(i, val) {
			a['https://www.battlenet.com.cn' + $(val).attr('href')] = '';
		});
		//获取标题，作者，时间，。简介
		for(var i in Object.keys(a)) {
			arr[i] = {
				href: Object.keys(a)[i], //
				title: $('.ForumTopic-title').eq(i).text().trim(),
				date: $('.ForumTopic-timestamp--lastPost').eq(i * 2).text().trim(),
				author: $('.ForumTopic-author').eq(i).text().trim(),
				readed: $('.ForumTopic-replies').eq(i).find('span').text(),
				introd: $('.ForumTopic-title').eq(i).attr('data-tooltip-content'),
			}
	
		};
		let ajaxArr = [];
		for(let i=0; i<arr.length; i++){
			let req = ajax(arr[i].href).then(function($){
				arr[i].content = $('.TopicPost-bodyContent').text();
				// log(arr[i])
				return new Promise(function(resolve,reject){
					resolve()
				})
				
			})
			ajaxArr.push(req)
		}
		
		Promise.all(ajaxArr).then(function(){
			res.status(200),
			res.json(arr)
		})
		
		
	})

})
//router.get('/getList',function(req,res,next){
//	startRequest()
//})
//startRequest(url, function($) {
//		//			log($('.ForumTopic-details').html())
//		
//		//通过href获取详情
//		for(i in arr) {
//			startRequest(arr[i].href, function($) {
//				arr[i].content = $('.TopicPost-bodyContent').text();
//				log(arr[i].content = $('.TopicPost-bodyContent').text());
//				i++;
//			})
//		}
//});

function ajax(a){
	log('访问地址：'+a||url)
	if(!a){
		a = url
	}
	return new Promise(function(resolve,reject){
			http.get(a, function(res) {
				log('获得返回：')
				var html = '';
				res.setEncoding('utf-8'); //防止中文乱码
				//监听data事件，每次取一块数据
				res.on('data', function(chunk) {
					html += chunk;
				});
		
				//监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
				res.on('end', function() {
					log('请求完成')
					log(html)
					var $ = cheerio.load(html); //采用cheerio模块解析html
	//				fun && fun($);
					resolve($)
				})
		})
	})
}


function save() {

	fs.appendFile('./data/' + news_title + '.txt', x, 'utf-8', function(err) {
		if(err) {
			console.log(err);
		}
	});
}
module.exports = router;