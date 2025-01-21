// 发布页 https://www.nmdvd.com/
var rule = {
    title: '农民影视[优]',
    tab_rename: {'默认': '线路①', '播放': '线路①', '滴滴': '线路①'}, //host:'https://www.nmddd.com',
    host: 'https://www.nmdvd.com/',
    hostJs: `print(HOST);let html=request(HOST,{headers:{"User-Agent":MOBILE_UA}});
	let src = jsp.pdfh(html,"body&&a:eq(1)&&href")||jsp.pdfh(html,"body&&a:eq(1)&&Text");
	if(!src.startsWith('http')){src='https://'+src};print("抓到主页:"+src);HOST=src`,
    url: '/vod-list-id-fyfilter.html', // /vod-list-id-2-pg-1-order--by-time-class-0-year-2023-letter--area--lang-.html
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}-pg-fypage-order--by-{{fl.by or "time"}}-class-0-year-{{fl.year}}-letter-{{fl.letter}}-area-{{fl.area}}-lang-',
    filter: 'H4sIAAAAAAAAA+2Z304TQRyF32WvuZjZtjNT3sBnMFxUbCJRMQE0IYRELQgtCmqkFS3+iZaWiFICIbIIfZnulr6FW7o756CJMeGyc9ffOd3Z+YYm+2VZ8KQ3fnPBu1uc98a9ycJc8cZtb8ybLtwvxnPv4DT8sBbPjwr3HhYvvzgdx+Fyq19qDeJ4kN7iWBJXWt2zeq+8kjQ5NNV6WG6iUbbprR5EpWU0Gk3zVXhyisbYJnryMnpcRZPHfcrNK6tJgYtW33aDMlXYd1SqRE/fUYXthY2VK5uQ8f4mBuXwvAozxQJOK6y3w+fBv08LK39t9reeJWkypF1/Zyv6uZ90yWCv22hHJ+fpdcPBHtn5evj+LOmSwa75cRddMtgDqDWi+l7SJYPtDtu4LhlsV22HlU/h9ue0trO96+5etN24aHS6wbv03hxZqhftMNhJqYZD2l2sHWAHyYDdbfLuNrmLtxKtdeKjTZe1s1250eltfO+Vt9LF7Zx+o9tZ6p3Vomr6x8Bs77J8HP4opbcYDvwTmS8WZugncnLUPf3ynz8RX/i5JLv8SHkWeZbzDPIM5z5yn3OJXHIukAvKZd7mMs+5QW4418g15wq54hy8knkleCXzSvBK5pXglcwrwSuZV4JXMq8Ar2BeAV7BvAK8gnkFeAXzCvAK5hXgFcwrwCuYV4BXMK8Ar2BeAV4BXpnPp7yXHyk3yA3nGrnmXCFXnOeQ5zjPIs9ynkGe4dxH7nMukUvOBXLmNeA1zGvAa5jXgNcwrwGvYV4DXsO8BryGeQ14DfMa8BrmNeA1zGvAa5hXg1czrwavZl4NXs28GryaeTV4NfNq8Grm1eDVzKvBq5lXg1czrwavZl4FXsW8CryKeRV4FfMq8CrmVeBVzKvAq5hXgVcxrwKvYl4FXsW8CrzxR37c3JrHwyZafx0GG389bKLacb92lCwwNxV/1T7tgiBqv0maO1Nzs3hS7i+Fq6mtzE4+mCkO7jox5vnXtEfQxo/ubtCMDS5FQxX7z8B0DttphbOLbWUgM7gKxx3tNQcOhCrn3M25m3M3527O3Zy7OXdz7jbi7pYhd3M25GzI2ZCzIWdDzoacDTkbGj0byl7zTRZOJ6y0ol/f6MWT+aOi/yfm3TspZ2HOwpyFOQtzFuYszFnYiFuYr9xLKadDToecDjkdcjrkdMjp0Ajr0OJvhcPuJ54vAAA=',
    filter_def: {
        1: {cateId: '1'}, 2: {cateId: '2'}, 3: {cateId: '3'}, 4: {cateId: '4'}, 26: {cateId: '26'}
    },
    searchUrl: '/index.php?m=vod-search&wd=**',
    searchable: 2,//是否启用全局搜索,
    headers: {//网站的请求头,完整支持所有的,常带ua和cookies
        'User-Agent': 'MOBILE_UA',
    }, // class_parse: '#topnav li:lt(4);a&&Text;a&&href;.*/(.*?).html',
    class_name: '电视剧&电影&综艺&动漫&短剧',//静态分类名称拼接
    class_url: '2&1&3&4&26',//静态分类标识拼接
    play_parse: true,
    lazy: $js.toString(() => {
        let init_js = `Object.defineProperties(navigator, {platform: {get: () => 'iPhone'}});`;
        input = {
            parse: 1,
            url: input,
            js: `try{location.href = document.querySelectorAll("iframe")[1].src;}catch(err) {}document.querySelector(".line").click()`,
            parse_extra: '&init_script=' + encodeURIComponent(base64Encode(init_js)),
        }
    }),
    limit: 6,
    推荐: '.globalPicList li:has(img);a&&title;*;*;*',
    一级: '.globalPicList li;.sTit&&Text;img&&src;.sBottom--em&&Text;a&&href',
    二级: {
        "title": ".title&&Text;.type-title&&Text",
        "img": ".page-hd&&img&&src",
        "desc": ".desc_item:eq(3)&&Text;.desc_item:eq(4)--span&&Text;;.desc_item:eq(1)--span&&Text;.desc_item:eq(2)--span&&Text",
        "content": ".detail-con p&&Text",
        "tabs": ".hd",
        "lists": ".numList:eq(#id) li"
    },
    搜索: '.ulPicTxt.clearfix li;*;img&&data-src;.sDes:eq(1)&&Text;*',
}
