let requestTimes = 0;
/**
 * Promise版本wx.request()封装
 * @param {Object} params 
 */
export const request = function (params) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '拼了老命加载中',
    });
    requestTimes++;
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1' + params.url,
      data: {
        ...params.data
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        if (!--requestTimes) {
          wx.hideLoading();
        }
      }
    })
  })
}