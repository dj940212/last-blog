function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const formatTime = (date) => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-')
}

export const formatTimeAll = (date)=> {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


export const monthStr = (num) => {
    switch(num){
        case 0:
            return 'Jan'
            break;
        case 1:
            return 'Feb'
            break;
        case 2:
            return 'Mar'
            break;
        case 3:
            return 'Apr'
            break;
        case 4:
            return 'May'
            break;
        case 5:
            return 'Jun'
            break;
        case 6:
            return 'Jul'
            break;
        case 7:
            return 'Aug'
            break;
        case 8:
            return 'Sep'
            break;
        case 9:
            return 'Oct'
            break;
        case 10:
            return 'Nov'
            break;
        case 11:
            return 'Dec'
            break;
        default:
            return 'bug'
    }
}

// 获取十进制颜色值
export const  colorNum = (code) => {
    var sColor = code.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));
            }
            sColor = sColorNew
        }
        sColor =  sColor.slice(1)
        sColor = parseInt("0x"+sColor)
    }
    return sColor;
};

// 距离当前时间
export const fromNow = (dateStr) => {
      const between = Date.now() / 1000 - Number(new Date(dateStr).getTime()) / 1000;
      if (between < 3600) {
          return (~~(between / 60)+' minutes ago');
      } else if (between < 86400) {
          return (~~(between / 3600)+' hours ago');
      } else {
          return (~~(between / 86400)+' days ago');
      }
  }
