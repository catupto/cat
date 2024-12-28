var rule = {
    title: '小阳影视',
    模板: 'mxpro',
    host: 'https://xn--yety66k.eu.org',
    url:'/index.php/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/index.php/vod/search/wd/**.html',            
    filterable: 0,
    lazy: `js:
		var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
		var url = html.url;
		if (html.encrypt == '1') {
			url = unescape(url)
		} else if (html.encrypt == '2') {
			url = unescape(base64Decode(url))
		}
		if (/\\.m3u8|\\.mp4/.test(url)) {
			input = {
				jx: 0,
				url: url,
				parse: 0
			}
		} else if (/\\/share/.test(url)) {
			url = getHome(url) + request(url).match(/main.*?"(.*?)"/)[1];
			input = {
				jx: 0,
				url: url,
				parse: 0
			}
		} else {
			input
		}
	`
}
