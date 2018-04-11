var http = require('https');
var log = console.log;
var express = require('express');
var router = express.Router();

var url = "https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&limit=20&category=5562b415e4b00c57d9b94ac8";


router.get('/', function(req, res) {
	http.get(url, function(resquest) {
		var html = '';
		resquest.setEncoding('utf-8'); //防止中文乱码

		//监听data事件，每次取一块数据
		resquest.on('data', function(chunk) {
			html += chunk;
		});

		//监听end事件，如果整个网	页内容的html都获取完毕，就执行回调函数
		resquest.on('end', function() {
			html=JSON.parse(unescape(html.replace(/\\u/g, '%u')))
			res.status(200)
			res.json(html)
		})
	})
})

router.get('/juejinResourcesUserInfo', function(req, res) {
	let url=req.url;
	let ids=url.split('ids=')[1];
	let juejinResourcesUserInfo='https://lccro-api-ms.juejin.im/v1/get_multi_user?uid=&device_id=&token=&src=web&ids='+ids+'&cols=viewedEntriesCount%7Crole%7CtotalCollectionsCount%7CallowNotification%7CsubscribedTagsCount%7CappliedEditorAt%7Cemail%7CfollowersCount%7CpostedEntriesCount%7ClatestCollectionUserNotification%7CcommentedEntriesCount%7CweeklyEmail%7CcollectedEntriesCount%7CpostedPostsCount%7Cusername%7ClatestLoginedInAt%7CtotalHotIndex%7CblogAddress%7CselfDescription%7ClatestCheckedNotificationAt%7CemailVerified%7CtotalCommentsCount%7Cinstallation%7Cblacklist%7CweiboId%7CmobilePhoneNumber%7Capply%7CfolloweesCount%7CdeviceType%7CeditorType%7CjobTitle%7Ccompany%7ClatestVoteLikeUserNotification%7CauthData%7CavatarLarge%7CmobilePhoneVerified%7CobjectId%7CcreatedAt%7CupdatedAt';

	http.get(juejinResourcesUserInfo, function(resquest) {
		var html = '';
		resquest.setEncoding('utf-8'); //防止中文乱码

		//监听data事件，每次取一块数据
		resquest.on('data', function(chunk) {
			html += chunk;
		});

		//监听end事件，如果整个网	页内容的html都获取完毕，就执行回调函数
		resquest.on('end', function() {
			html=JSON.parse(html)
			res.status(200)
			res.json(html)
		})
	})
})

module.exports=router;