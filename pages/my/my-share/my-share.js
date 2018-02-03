var app = getApp();
const https = app.https;
const util = app.util;

Page({
  data: {
    allShare: []
  },
  create: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/share/create/create'
    });
  },
  detial: function (e) {
    var id = e.target.dataset.id;
    if (!id) {
      return;
    }
    wx.navigateTo({
      url: '/pages/share/detail/detail?id=' + id
    });
  },
  onLoad: function () {
    var _this = this;
    //调用应用实例的方法获取全局数据
    https.GET({
      url: 'share/my',
      success: function (res) {
        console.log(res);
        _this.setData({
          allShare: res.data.data
        });
        wx.hideNavigationBarLoading();
      },
      fail: function (res) {
      }
    });
  }
});