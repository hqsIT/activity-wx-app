var app = getApp();
const https = app.https;
const util = app.util;

Page({
  data: {

  },
  goToJoin: function (e) {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  detial: function (e) {
    var id = e.target.dataset.id;
    if (!id) {
      return;
    }
    wx.navigateTo({
      url: '/pages/activity/detail/detail?id=' + id
    });
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我参与的活动'
    });
    var _this = this;
    //调用应用实例的方法获取全局数据
    https.GET({
      url: 'activity/myJoinActivity',
      success: function (res) {
        console.log(res);
        _this.setData({
          allActivity: res.data.data
        });
        wx.hideNavigationBarLoading();
      },
      fail: function (res) {
      }
    });
  }
});