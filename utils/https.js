const app = getApp();
const util = require('./util.js');
var server = 'http://xhh.klinson.com/api/';
// var server = 'http://127.0.0.1:8004/api/';
//GET请求
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求
function POST(requestHandler) {
  request('POST', requestHandler)
}
//request请求
function request(method, requestHandler) {
  let params = requestHandler.params;
  let API_URL = server + requestHandler.url;
  wx.showLoading({
    title: '加载中',
  });
  let sessionId = wx.getStorageSync('sessionId');
  wx.request({
    url: API_URL,
    data: JSON.stringify(params),
    method: method,
    header: {
      'content-type': 'application/json',
      'cookie': 'laravel_session=' + wx.getStorageSync('authorization'),
    },
    success: function(res) {
      wx.hideLoading();
      if (res.data.code === 1002) {
        util.showModal('', '用户未登录，或者登录时间过长，请重新进行登录！', () => {
          wx.switchTab({
            url: '/pages/user/user',
            success: function() {
              wx.removeStorageSync('bindPhone');
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('sessionId');
              wx.removeStorageSync('headUrl');
              wx.removeStorageSync('type');
            }
          })
        });
      } else {
        requestHandler.success && requestHandler.success(res);
      }
    },
    fail: function(res) {
      console.log(res, 'resfali------');
      requestHandler.fail && requestHandler.fail(res);
    }
  })
}
// 检测数据是否为空
function CHECK(data, name) {
  if(!data) {
    util.showModal('', name + '不能为空');
    return false
  } else {
    return data;
  }
}

module.exports = {
  GET: GET,
  POST: POST,
  CHECK: CHECK,
}