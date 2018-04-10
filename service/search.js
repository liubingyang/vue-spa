var http = require('https');
var fs = require('fs');
var iconv = require('iconv-lite');
// var Iconv = require('iconv').Iconv;
var encoding=require('encoding')
var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a";
var log = console.log;
var buffer = [];
var option={
    hostname:'sp0.baidu.com',
    path:'/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a',
    headers:{
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding':'gzip, deflate, br',  //这里设置返回的编码方式 设置其他的会是乱码
      'Accept-Language':'zh-CN,zh;q=0.9',
      'Connection':'keep-alive',
      'Cookie':'BAIDUID=A80387FE41AECA34C06D32065AD62B8A:FG=1; BIDUPSID=A80387FE41AECA34C06D32065AD62B8A; PSTM=1516253535; BDUSS=RGZ0U4NXYzdFdhbGdPM3B4blpmSFFJelBSclZrU0xSdHI4UXBEY1F0aDNwNkJhQUFBQUFBJCQAAAAAAAAAAAEAAADcKes9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHcaeVp3GnlaUj; BAEID=41AA0EE639833269B6CA6387E0C44102; MCITY=-289%3A; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; H_PS_PSSID=1436_21100_22158; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; PSINO=2',
      'Host':'sp0.baidu.com',
      'Referer':'https://www.baidu.com/' 
    }
  };

http.get(option, function(res) {
	var html = '';
	// res.setEncoding('utf-8'); //防止中文乱码
	
	//监听data事件，每次取一块数据
	res.on('data', function(chunk) {
		buffer.push(chunk)
		html += chunk;
	});

	//监听end事件，如果整个网	页内容的html都获取完毕，就执行回调函数
	res.on('end', function() {
		console.log(html)
		var text=encoding.convert(html,'utf-8','gbk')
		var buffer = Buffer.from(html);
		console.log(buffer);//得到文件内容对应的Buffer
		// var text = iconv.decode(buffer,'gbk');//使用GBK解码
		// var text = (new Iconv("GBK","UTF-8")).convert(new Buffer(html,"binary")).toSting()
		log(text.toString())
		// fs.appendFile('./a.txt', html, 'utf-8', function(err) {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// });
	})
})