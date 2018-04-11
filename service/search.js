var http = require('https');
var fs = require('fs');
var iconv = require('iconv-lite');
// var Iconv = require('iconv').Iconv;
var encoding=require('encoding')
var url = "https://lccro-api-ms.juejin.im/v1/get_multi_user?uid=&device_id=&token=&src=web&ids=59393d1ffe88c2006af9bb4b&cols=viewedEntriesCount%7Crole%7CtotalCollectionsCount%7CallowNotification%7CsubscribedTagsCount%7CappliedEditorAt%7Cemail%7CfollowersCount%7CpostedEntriesCount%7ClatestCollectionUserNotification%7CcommentedEntriesCount%7CweeklyEmail%7CcollectedEntriesCount%7CpostedPostsCount%7Cusername%7ClatestLoginedInAt%7CtotalHotIndex%7CblogAddress%7CselfDescription%7ClatestCheckedNotificationAt%7CemailVerified%7CtotalCommentsCount%7Cinstallation%7Cblacklist%7CweiboId%7CmobilePhoneNumber%7Capply%7CfolloweesCount%7CdeviceType%7CeditorType%7CjobTitle%7Ccompany%7ClatestVoteLikeUserNotification%7CauthData%7CavatarLarge%7CmobilePhoneVerified%7CobjectId%7CcreatedAt%7CupdatedAt";
var log = console.log;
var buffer = [];
var option={
    hostname:'timeline-merger-ms.juejin.im',
    path:'/v1/get_entry_by_rank?src=web&limit=20&category=5562b415e4b00c57d9b94ac8',
    headers:{
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding':'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
      'Accept-Language':'zh-CN,zh;q=0.9',
      'Connection':'keep-alive',
      'Host':'timeline-merger-ms.juejin.im',
      'Referer':'https://juejin.im/welcome/frontend' 
    }
  };

http.get(url, function(res) {
	var html = '';
	res.setEncoding('utf-8'); //防止中文乱码
	
	//监听data事件，每次取一块数据
	res.on('data', function(chunk) {
		buffer.push(chunk)
		html += chunk;
	});

	//监听end事件，如果整个网	页内容的html都获取完毕，就执行回调函数
	res.on('end', function() {
		console.log(html)
		// var text=encoding.convert(html,'utf-8','gbk')
		// var buffer = Buffer.from(html);
		// console.log(buffer);//得到文件内容对应的Buffer
		// var text = iconv.decode(buffer,'gbk');//使用GBK解码
		// var text = (new Iconv("GBK","UTF-8")).convert(new Buffer(html,"binary")).toSting()
		// log(text.toString())
		// fs.appendFile('./a.txt', html, 'utf-8', function(err) {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// });
	})
})