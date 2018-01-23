//app.js

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    //var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
    this.login(function (res) {
      wx.setStorageSync('authorization', res.authorization);
      wx.setStorageSync('openid', res.openId);

      console.log(res);
    });
    console.log('start');
  },
  getUserInfo: function(cb) {
    var that = this

    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });
        }
      })
    }
  },
  login: function(callback) {
    var _this = this;

    if (_this.globalData.opendID) {
      callback({
        openID: _this.globalData.opendID,
        authorization: _this.globalData.authorization
      });
    } else {
      wx.login({
        success: function(res) {
          var code = res.code;
          wx.getUserInfo({
            success: function(res) {

              wx.request({
                url: _this.globalData.domain + 'user/wxLogin',
                method: 'post',
                data: {
                  userInfo: res.userInfo,
                  code: code,
                  APPID: _this.globalData.APPID,
                },
                success: function(res) {
                  console.log(res)
                  if (callback && res && res.data) {
                    callback({
                      openID: res.data.data.openId,
                      authorization: res.data.data.session_id
                    });
                  }
                },
                fail: function() {
                  callback({
                    openID: null,
                    authorization: null
                  });
                }
              });
            }
          })

        }
      });
    }


    wx.checkSession({
      success: function(res) {
        console.log('成功', res);
      },
      fail: function(res) {
        console.log('失败', res);
      }
    });
  },
  globalData: {
    getTime: function() {
      return new Date().getTime();
    },
    // domain: 'http://xhh.klinson.com/api/',
    domain: 'http://127.0.0.1:8004/api/',
    APPID: 'wx569ed62c17da1cae',
    SECRET: 'b1dd4f1a57b984f11aff18390b7e4309',
    opendID: null,
    userInfo: null
  }
})