var app = getApp();

Page({
  data: {

  },
  goToJoin: function (e) {
    wx.switchTab({
      url: '/pages/activity/all/all'
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
    wx.request({
      url: app.globalData.domain + 'activity/myJoinActivity',
      header: {
        'cookie': 'laravel_session=' + wx.getStorageSync('authorization')
      },
      data: {

      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        _this.setData({
          allActivity: res.data.data
        });
        wx.hideNavigationBarLoading();
      }
    });
  }
});