var rule = {
    title: '旺旺影视',
    //host: 'https://www.nmdvd.com',
//hostJs: 'HOST = pdfh(request(HOST), "b:eq(0)&&Text"); !HOST.startsWith("http") ? HOST = "https://"+HOST : HOST',
//headers: {'User-Agent': 'PC_UA'},
    host: 'https://www.wwgz.cn',
url: '/vod-list-id-fyfilter.html',
filter_url: '{{fl.cateId}}-pg-fypage-order--by-{{fl.by}}-class-0-year-{{fl.year}}-letter-{{fl.letter}}-area-{{fl.area}}-lang-',
searchUrl: '/vod-search-pg-fypage-wd-**.html',
    class_name: '剧集&电影&综艺&动漫&短剧',
class_url: '2&1&3&4&26',
filter_def: {
1: {cateId: '1'},
2: {cateId: '2'},
3: {cateId: '3'},
4: {cateId: '4'},
26: {cateId: '26'}
},
    tab_rename: { '默认': '线路①', '播放': '线路①', '滴滴': '线路①' },
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    play_parse: true,
    lazy: $js.toString(() => {
        let init_js = `Object.defineProperties(navigator, {platform: {get: () => 'iPhone'}});`;
        input = {
            parse: 1,
            url: input,
            js: `
                try {
                    // 提取 iframe 的播放地址
                    let iframeSrc = document.querySelectorAll("iframe")[1].src;
                    if (iframeSrc.includes('https://vip.wwgz.cn:5200/nmplay/webcloud/relay.php?url=')) {
                        // 解析 relay.php 的 URL
                        let relayUrl = new URL(iframeSrc);
                        let realUrl = relayUrl.searchParams.get('url');
                        if (realUrl) {
                            location.href = realUrl;
                        }
                    } else {
                        location.href = iframeSrc;
                    }
                } catch (err) {
                    console.error('iframe 提取失败:', err);
                }
                // 点击播放按钮
                document.querySelector(".line").click();
            `,
            parse_extra: '&init_script=' + encodeURIComponent(base64Encode(init_js)),
        };
    }),
    limit: 6,
    double: true,
    推荐: '.resize_list;*;*;*;*;*',
    一级: 'ul.resize_list li;a&&title;img&&src;.sBottom&&Text;a&&href',
    二级: {
        title: '.page-bd&&h1&&Text;.content_detail:eq(1)&&li&&a:eq(2)&&Text',
        img: 'img&&src',
        desc: '.desc_item:eq(0)&&Text;.desc_item:eq(4)&&Text;.desc_item:eq(3)&&Text;.desc_item:eq(2)&&Text;.desc_item:eq(1)&&Text',
        content: '.detail-con&&p&&Text',
        tabs: '.hd',
        lists: '.numList:eq(#id) li',
    },
    搜索: '*',
    filter: 'H4sIAAAAAAAAA+2YW09TQRDH3/sxznNNdlsorW/c7/c7hIeKJ5GImEA1IYRELQgtAmqkFSxeEktLBCnBEClCv0z3lH4LT2XOzNQHQ8KDGPftzO/P7s5/2bMzp3MuQxq3R11zxn1z1rhtjAdDZvNdw21MBR+Ydlw4PFXvV+z4cXDykQ1G54wpG6vFdDGcLmE7kMa8G3A0nT9LFCJLoFSSEkuoSIoUHyqF5UMrvEhKFSmpV+rklBQ/KtbTl9aTGCkBWieSKptNChq0/DafjTCJ8rbCUevZFpMoPZVcKktC2vmNzbtxw4LTZpC2SyUy6kX2z9tFU39OFTefA4XA0Yo7m9b3A9AgwHHrGevk3Bl3GeCena+pd2egQYBzftglDQLcgXjSSuyBBgFqRxkaBwFqsYyKflTbnxwZY1x1d8/aTl4kc/nslrM2R+hqNaOyO46ry8DRLlYOKQMIKLsNnt0G1+xUrJWcvbXOtBjjzMlcYX2/ENl0JsfY+Yt8bqFwFrdizj+DYlxl8Vh9DTtLXAZlZ2TWDE7TGbHix8X4tyueEY/wVAL79ch4BfEKzr3EvZx7iHs4l8Ql54K4YFwGkMsA537ifs6riFdx7iPu45z8Su5Xkl/J/UryK7lfSX4l9yvJr+R+JfmV3K8gv4L7FeRXcL+C/AruV5Bfwf0K8iu4X0F+BfcryK/gfgX5FdyvIL+C+xXk134sO6+TZihkshOr9uPWweoVT2w1gGokNUBqkNQCqUVSB6QOST2QeiQNQBqQNAJpRNIEpAlJM5BmJC1AWpC0AmlF0gakDUk7kHYkHUA6kHQC6UTSBaQLSTeQbiQ9QHqQ9ALpRdIHpA9JP5B+JANABpAMAhlEMgRkCMkwkGEkI0BGkIhbzktQeio7K3dm2c229lpl1694TugatIPQhD0B3rjZrJV5A8q9idAM3dYHC2rZqZgz4w+nzVIyrjG3y/Bct4uhd8auIPlsyu4knJJPkl2GSwX3KONIXuYnWaqpNIpeWmsvVSrFJFXqHkL3ELqH0D2E7iF0D6F7iJvSQ3h5D6GLsi7KuijroqyLsi7Kuij/vaJccd0Pe3rHVDRt/fjCvsP9v0nsZ/6A/kTX3YDuBnQ3oLsB3Q3obuCmdAMen/5G11X5f6vK+tbWt/Y/e2u75n8C50tbkWUmAAA='
};