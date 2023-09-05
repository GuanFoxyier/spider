// 先得到 S

/*

基于正则，匹配 navigator.platform
[
    /^Win32/,
    /^Win64/,
    /^Linux armv|Android/,
    /^Android/,
    /^iPhone/,
    /^iPad/,
    /^MacIntel/,
    /^Linux [ix]\d+/,
    /^ARM/,
    /^iPod/,
    /^BlackBerry/,
]


// 16 个检测项
1、
navigator.javaEnabled();

2、
遍历 PluginArray.name，匹配 /Shockwave/i
for (var o = 0; o < R["length"]; o++) {
          var i = R[o]['name'];
          if (new RegExp("/Shockwave/i").test(i)) return !0;
        }
        return !1;

3、
遍历 PluginArray.name，  匹配 /PDF|Acrobat/i
4、
遍历 PluginArray.name，  匹配 /Native Client/
5、
window.navigator.webdriver
6、
"localStorage" in window
7、
"1" == (navigator["msDoNotTrack"] || navigator["doNotTrack"])
8、
/zh-cn/i.test(navigator["language"] || navigator["systemLanguage"]);
9、
"ontouchstart" in document
10、
-480 === new Date().getTimezoneOffset();
11、
!!document.createElement("canvas").getContext("webgl2");
12、
n = navigator["languages"]
return n && n.length > 0
13、
"iso-8859-1" === document.defaultCharset;
14、 不是检测项？
" 00:00:0"
15、
a[87] 看起来像是检测 ast 还原
16、
e[27] 看起来像是检测 ast 还原

 */


/*
S[5]  25 个检测项，只要有一个是 true， 就直接返回。

1、
"callPhantom" in window
2、
"MozSettingsEvent" in window
3、
"safari" in window
4、
"ActiveXObject" in window  && !("maxHeight" in document.getElementsByTagName("head")[0]);
5、
"ActiveXObject" in window && !("postMessage" in window);
6、
"ActiveXObject" in window && !i;
7、
"ActiveXObject" in window && !window["Uint8Array"];
8、
"ActiveXObject" in window && !window["WeakMap"];
9、
"ActiveXObject" in window && !window["WeakMap"];
10、
"Google Inc." === navigator["vendor"];
11、
"Apple Computer, Inc." === navigator["vendor"];
12、
"ActiveXObject" in window
13、//
"chrome" in window
14、

15、
"sgAppName" in navigator;
16、


 */

function bool_to_num(a) {
    for (var o = 0, i = a["length"] - 1; i >= 0; i--) o = o << 1 | +a[i];
    return o;
}

var check_result = bool_to_num([
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    " 00:00:0",
    false,
    false
]);

function str_hash(ua) {
    for (var i = 0, s = 0, v = ua["length"]; s < v; s++) i = (i << 5) - i + ua.charCodeAt(s), i >>>= 0;
    return i;
}



//     var S = {
//     // random     Math.random() * parseInt("11111111111111111111111111111111", 2) >>> 0;
//     "0": 1283807900,
//         // 常量，在 js 顶部写死
//     "1": 1611313000,
//         //当前 10 位时间戳
//     "2": 1693364418,
//         // 基于 ua 做的 hash
//     "3": 3637427048,
//         // 基于正则匹配，获取 platform
//     "4": 7,
//         // 25 个检测项
//     "5": 10,
//        // navigator["plugins"]['length'])
//     "6": 5,
//     "7": 0,
//         // 鼠标点击
//     "8": 0,
//         // 鼠标滑轮
//     "9": 0,
//         // 键盘摁下
//     "10": 0,
//         // 点击坐标-x
//     "11": 0,
//         // 点击坐标-y
//     "12": 0,
//         // 布尔转数字， 基于 16 个检测项
//     "13": 3748,
//         // 鼠标移动
//     "14": 0,
//         // 固定值
//     "15": 0,
// 赋值函数调用了几次
//     "16": 10,
//         // 固定值
//     "17": 3,
//         // 初始化时候固定的
//     "base_fileds": [
//         4,
//         4,
//         4,
//         4,
//         1,
//         1,
//         1,
//         3,
//         2,
//         2,
//         2,
//         2,
//         2,
//         2,
//         2,
//         4,
//         2,
//         1
//     ]
// }
//
//     S[T]++, S[f] = ot.serverTimeNow(), S[l] = ot.timeNow(), S[k] = zn, S[I] = it.getMouseMove(), S[_] = it.getMouseClick(), S[y] = it.getMouseWhell(), S[E] = it.getKeyDown(), S[A] = it.getClickPos().x, S[C] = it.getClickPos().y;
//     var n = S.toBuffer();
//     return et.encode(n);

function getSign() {
    var S = {
        "0": Math.random() * parseInt("11111111111111111111111111111111", 2) >>> 0,
        "1": 1611313000,
        "2": Date.now() / 1000 >>> 0,
        "3": str_hash("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"),
        "4": 7,
        "5": 10,
        "6": 5,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "11": 0,
        "12": 0,
        "13": 3748,
        "14": 0,
        "15": 0,
        "16": 1,
        "17": 3,
        "base_fileds": [
            4,
            4,
            4,
            4,
            1,
            1,
            1,
            3,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            4,
            2,
            1
        ]
    }

    function toBuffer(S) {
        for (var r = S["base_fileds"], e = [], o = -1, i = 0, s = r["length"]; i < s; i++) {
            for (var v = S[i], f = r[i], l = o += f; e[l] = v & parseInt("255", 10), --f != 0;) {
                --l, v >>= 8;
            }
        }
        return e;
    }

    var s_buffer = toBuffer(S);


    function encode(n) {
        for (var y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", A = {}, O = 0; O < 64; O++) {
            A[y.charAt(O)] = O;
        }

        function S(n, e, a, o, i) {
            for (var c = n["length"]; e < c;) a[o++] = n[e++] ^ i & parseInt("255", t[29]), i = ~(i * parseInt("10000011", 2));
        }

        function x(t) {
            for (var e = 0, o = 0, i = t["length"]; o < i; o++) e = (e << 5) - e + t[o];
            return e & 255;
        }

        function M(o) {
            for (var i = "7", s = 0, v = o["length"], f = []; s < v;) {
                var p = o[s++] << 16 | o[s++] << parseInt("10", 8) | o[s++];
                f.push(y.charAt(p >> parseInt("10010", 2)), y.charAt(p >> 12 & 63),
                    y.charAt(p >> 6 & 63), y.charAt(p & parseInt("3f", 16)));
            }
            return f.join("");
        }

        var t = x(n),
            e = [3, t];
        return S(n, +0, e, +2, t), M(e);


    }

    return encode(s_buffer);
}


console.log(getSign())