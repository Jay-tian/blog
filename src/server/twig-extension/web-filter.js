module.exports = {
  timeDate2str: function(time) {
    time = new Date(time).getTime()/ 1000;
    let currentTime = parseInt(new Date().getTime()/ 1000);
    
    time = currentTime-time;
    if (time < 60) {
      return time+'秒前';
    }

    if (time < 3600) {
      return parseInt(time/60) +'分钟前';
    }

    if (time < 3600 * 24) {
      return parseInt(time/3600) +'小时前';
    }

    return parseInt(time/3600/24) +'天前';
  },
};