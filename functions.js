/**
 * 检测字符串是否是电子邮件地址格式
 * @param 	{string}	value	待检测字符串
 * @returns {string}
 */
function isEmail(value){
    var Reg =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return Reg.test(value);
}

/**
 * 和PHP一样的时间戳格式化函数
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 */
function date(format, timestamp){
    var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
    var pad = function(n, c){
        if((n = n + "").length < c){
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var txt_ordin = {
        1:"st",
        2:"nd",
        3:"rd",
        21:"st",
        22:"nd",
        23:"rd",
        31:"st"
    };
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var f = {
        // Day
        d: function(){
            return pad(f.j(), 2)
        },
        D: function(){
            return f.l().substr(0,3)
        },
        j: function(){
            return jsdate.getDate()
        },
        l: function(){
            return txt_weekdays[f.w()]
        },
        N: function(){
            return f.w() + 1
        },
        S: function(){
            return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
        },
        w: function(){
            return jsdate.getDay()
        },
        z: function(){
            return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
        },

        // Week
        W: function(){
            var a = f.z(), b = 364 + f.L() - a;
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                return 1;
            } else{
                if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime()/1000));
                } else{
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                }
            }
        },

        // Month
        F: function(){
            return txt_months[f.n()]
        },
        m: function(){
            return pad(f.n(), 2)
        },
        M: function(){
            return f.F().substr(0,3)
        },
        n: function(){
            return jsdate.getMonth() + 1
        },
        t: function(){
            var n;
            if( (n = jsdate.getMonth() + 1) == 2 ){
                return 28 + f.L();
            } else{
                if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                    return 31;
                } else{
                    return 30;
                }
            }
        },

        // Year
        L: function(){
            var y = f.Y();
            return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
        },
        //o not supported yet
        Y: function(){
            return jsdate.getFullYear()
        },
        y: function(){
            return (jsdate.getFullYear() + "").slice(2)
        },

        // Time
        a: function(){
            return jsdate.getHours() > 11 ? "pm" : "am"
        },
        A: function(){
            return f.a().toUpperCase()
        },
        B: function(){
            // peter paul koch:
            var off = (jsdate.getTimezoneOffset() + 60)*60;
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
            var beat = Math.floor(theSeconds/86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00"+beat;
            if ((String(beat)).length == 2) beat = "0"+beat;
            return beat;
        },
        g: function(){
            return jsdate.getHours() % 12 || 12
        },
        G: function(){
            return jsdate.getHours()
        },
        h: function(){
            return pad(f.g(), 2)
        },
        H: function(){
            return pad(jsdate.getHours(), 2)
        },
        i: function(){
            return pad(jsdate.getMinutes(), 2)
        },
        s: function(){
            return pad(jsdate.getSeconds(), 2)
        },
        //u not supported yet

        // Timezone
        //e not supported yet
        //I not supported yet
        O: function(){
            var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
            return t;
        },
        P: function(){
            var O = f.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2))
        },
        //T not supported yet
        //Z not supported yet

        // Full Date/Time
        c: function(){
            return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
        },
        //r not supported yet
        U: function(){
            return Math.round(jsdate.getTime()/1000)
        }
    };

    return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
        if( t!=s ){
            // escaped
            ret = s;
        } else if( f[s] ){
            // a date function exists
            ret = f[s]();
        } else{
            // nothing special
            ret = s;
        }
        return ret;
    });
}

/**
 * 浮点数 乘法
 * @param  {mix} arg1 
 * @param  {mix} arg2 
 * @return {number}      
 */
function accMul(arg1,arg2) { 
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{
        if(s1.split(".")[1] != undefined )
            m+=s1.split(".")[1].length
    }catch(e){}
    try{
        if(s2.split(".")[1] != undefined )
            m+=s2.split(".")[1].length
    }catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

/**
 * 浮点数 除法
 * @param  {mix} arg1
 * @param  {mix} arg2
 * @return {number}
 */
function accDiv(arg1,arg2){
  var r1=0,r2=0,m,s1=arg1.toString(),s2=arg2.toString();
  try{
      if(s1.split(".")[1] != undefined )
          r1=s1.split(".")[1].length;
  }catch(e){}
  try{
      if(s2.split(".")[1] != undefined )
          r2=s2.split(".")[1].length;
  }catch(e){}
  m=Math.pow(10,Math.max(r1,r2));
  return (accMul(arg1,m))/(accMul(arg2,m));
}

/**
 * 浮点数 加法
 * @param  {mix} arg1
 * @param  {mix} arg2
 * @return {number}
 */
function accAdd(arg1,arg2){ 
  var r1=0,r2=0,m,s1=arg1.toString(),s2=arg2.toString();
  try{
      if(s1.split(".")[1] != undefined )
          r1=s1.split(".")[1].length;
  }catch(e){} 
  try{
      if(s2.split(".")[1] != undefined )
          r2=s2.split(".")[1].length;
  }catch(e){}
  m=Math.pow(10,Math.max(r1,r2));
  return (accMul(arg1,m)+accMul(arg2,m))/m;
} 

/**
 * 浮点数 减法
 * @param  {mix} arg1
 * @param  {mix} arg2
 * @return {number}
 */
function accSub(arg1,arg2){
   var r1=0,r2=0,m,n,s1=arg1.toString(),s2=arg2.toString();
   try{
       if(s1.split(".")[1] != undefined )
           r1=s1.split(".")[1].length;
   }catch(e){}
   try{
       if(s2.split(".")[1] != undefined )
           r2=s2.split(".")[1].length;
   }catch(e){}
   m=Math.pow(10,Math.max(r1,r2));
   //last modify by deeka
   //动态控制精度长度
   n=(r1>=r2)?r1:r2;
   return (accMul(arg1,m)-accMul(arg2,m))/m;
}

/**
 * 同PHP的base64_encode 依赖toUTF8函数
 * @param  {string} str 待编码字符串
 * @return {string}     返回base64编码的结果
 */
function base64_encode(str){
    var str = toUTF8(str);
    var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
    var out, i, j, len, r, l, c;
    i = j = 0;
    len = str.length;
    r = len % 3;
    len = len - r;
    l = (len / 3) << 2;
    if (r > 0) {
        l += 4;
    }
    out = new Array(l);
 
    while (i < len) {
        c = str.charCodeAt(i++) << 16 |
            str.charCodeAt(i++) << 8  |
            str.charCodeAt(i++);
        out[j++] = base64EncodeChars[c >> 18]
            + base64EncodeChars[c >> 12 & 0x3f]
            + base64EncodeChars[c >> 6  & 0x3f]
            + base64EncodeChars[c & 0x3f] ;
    }
    if (r == 1) {
        c = str.charCodeAt(i++);
        out[j++] = base64EncodeChars[c >> 2]
            + base64EncodeChars[(c & 0x03) << 4]
            + "==";
        }
    else if (r == 2) {
        c = str.charCodeAt(i++) << 8 |
            str.charCodeAt(i++);
        out[j++] = base64EncodeChars[c >> 10]
             + base64EncodeChars[c >> 4 & 0x3f]
             + base64EncodeChars[(c & 0x0f) << 2]
             + "=";
    }
    return out.join('');
}

/**
 * 同PHP的base64_decode 依赖toUTF16函数
 * @param  {string} str 待解码字符串
 * @return {string}     返回base64解码的结果
 */
function base64_decode(str){
    var base64DecodeChars = [
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
            52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
            -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
            -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
        ];
    var c1, c2, c3, c4;
    var i, j, len, r, l, out;
 
    len = str.length;
    if (len % 4 != 0) {
        return '';
    }
    if (/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\+\/\=]/.test(str)) {
        return '';
    }
    if (str.charAt(len - 2) == '=') {
        r = 1;
    }
    else if (str.charAt(len - 1) == '=') {
        r = 2;
    }
    else {
        r = 0;
    }
    l = len;
    if (r > 0) {
        l -= 4;
    }
    l = (l >> 2) * 3 + r;
    out = new Array(l);
 
    i = j = 0;
    while (i < len) {
        // c1
        c1 = base64DecodeChars[str.charCodeAt(i++)];
        if (c1 == -1) break;
 
        // c2
        c2 = base64DecodeChars[str.charCodeAt(i++)];
        if (c2 == -1) break;
 
        out[j++] = String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
 
        // c3
        c3 = base64DecodeChars[str.charCodeAt(i++)];
        if (c3 == -1) break;
 
        out[j++] = String.fromCharCode(((c2 & 0x0f) << 4) | ((c3 & 0x3c) >> 2));
 
        // c4
        c4 = base64DecodeChars[str.charCodeAt(i++)];
        if (c4 == -1) break;
 
        out[j++] = String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return toUTF16(out.join(''));
}

/**
 * 字符串转为UTF8编码格式
 * @param  {string} str 待编码字符串
 * @return {string}
 */
function toUTF8(str){
    if (str.match(/^[\x00-\x7f]*$/) != null) {
        return str.toString();
    }
    var out, i, j, len, c, c2;
    out = [];
    len = str.length;
    for (i = 0, j = 0; i < len; i++, j++) {
        c = str.charCodeAt(i);
        if (c <= 0x7f) {
            out[j] = str.charAt(i);
        }
        else if (c <= 0x7ff) {
            out[j] = String.fromCharCode(0xc0 | (c >>> 6),
                                         0x80 | (c & 0x3f));
        }
        else if (c < 0xd800 || c > 0xdfff) {
            out[j] = String.fromCharCode(0xe0 | (c >>> 12),
                                         0x80 | ((c >>> 6) & 0x3f),
                                         0x80 | (c & 0x3f));
        }
        else {
            if (++i < len) {
                c2 = str.charCodeAt(i);
                if (c <= 0xdbff && 0xdc00 <= c2 && c2 <= 0xdfff) {
                    c = ((c & 0x03ff) << 10 | (c2 & 0x03ff)) + 0x010000;
                    if (0x010000 <= c && c <= 0x10ffff) {
                        out[j] = String.fromCharCode(0xf0 | ((c >>> 18) & 0x3f),
                                                     0x80 | ((c >>> 12) & 0x3f),
                                                     0x80 | ((c >>> 6) & 0x3f),
                                                     0x80 | (c & 0x3f));
                    }
                    else {
                       out[j] = '?';
                    }
                }
                else {
                    i--;
                    out[j] = '?';
                }
            }
            else {
                i--;
                out[j] = '?';
            }
        }
    }
    return out.join('');
}

/**
 * 字符串转为UTF16编码格式
 * @param  {string} str 待编码字符串
 * @return {string}
 */
function toUTF16(str){
    if ((str.match(/^[\x00-\x7f]*$/) != null) ||
        (str.match(/^[\x00-\xff]*$/) == null)) {
        return str.toString();
    }
    var out, i, j, len, c, c2, c3, c4, s;
 
    out = [];
    len = str.length;
    i = j = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxx xxxx
            out[j++] = str.charAt(i - 1);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            c2 = str.charCodeAt(i++);
            out[j++] = String.fromCharCode(((c  & 0x1f) << 6) |
                                            (c2 & 0x3f));
            break;
            case 14:
            // 1110 xxxx  10xx xxxx  10xx xxxx
            c2 = str.charCodeAt(i++);
            c3 = str.charCodeAt(i++);
            out[j++] = String.fromCharCode(((c  & 0x0f) << 12) |
                                           ((c2 & 0x3f) <<  6) |
                                            (c3 & 0x3f));
            break;
            case 15:
            switch (c & 0xf) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 1111 0xxx  10xx xxxx  10xx xxxx  10xx xxxx
                c2 = str.charCodeAt(i++);
                c3 = str.charCodeAt(i++);
                c4 = str.charCodeAt(i++);
                s = ((c  & 0x07) << 18) |
                    ((c2 & 0x3f) << 12) |
                    ((c3 & 0x3f) <<  6) |
                     (c4 & 0x3f) - 0x10000;
                if (0 <= s && s <= 0xfffff) {
                    out[j++] = String.fromCharCode(((s >>> 10) & 0x03ff) | 0xd800,
                                                  (s         & 0x03ff) | 0xdc00);
                }
                else {
                    out[j++] = '?';
                }
                break;
                case 8: case 9: case 10: case 11:
                // 1111 10xx  10xx xxxx  10xx xxxx  10xx xxxx  10xx xxxx
                i+=4;
                out[j++] = '?';
                break;
                case 12: case 13:
                // 1111 110x  10xx xxxx  10xx xxxx  10xx xxxx  10xx xxxx  10xx xxxx
                i+=5;
                out[j++] = '?';
                break;
            }
        }
    }
    return out.join('');
}

/**
 * 获取cookie
 * @param  {string} cname        cookie名称
 * @param  {string} cvalue       cookie值
 * @param  {int}    expire_days  过期时间 单位天
 * @return {void}
 */
function setCookie (cname, cvalue, expire_days) {
    var d = new Date();
    d.setTime(d.getTime() + (expire_days*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/**
 * 获取cookie
 * @param  {string} cname cookie名称
 * @return {string} 返回cookie的值
 */
function getCookie (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

/**
 * 清除cookie
 * @param  {string} cname cookie名称
 * @return {void}
 */
function clearCookie (cname) {
    setCookie(cname, "", -1);
}

/**
 * 将数字转换为大写金额
 * @param  {number} n  数字
 * @return {string} 转换后的大写金额
 */
function digitUppercase (n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};


/**
 * 判断是否为数组
 * @param  {mix} a  待判断变量
 * @return {boolean}
 */
function isArray(a) {
    Array.isArray ? Array.isArray(a) : Object.prototype.toString.call(a) === '[object Array]';
}