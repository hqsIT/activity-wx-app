const app = getApp();
const https = app.https;
const util = app.util;

Page({
  data: {
    allActivity: []
  },
  onShow: function () {
    this.getList();
  },
  showDetial: function (e) {
    var id = e.currentTarget.dataset.id;
    if (!id) {
      return;
    }
    wx.navigateTo({
      url: '/pages/activity/detail/detail?id=' + id
    });
  },
  create: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/activity/create/create'
    });
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.getList();
  },
  getList: function () {
    const _this = this;
    https.GET({
      url: 'activity/getLists',
      success: function (res) {
        // console.log(res, 'res0----');
        _this.setData({
          allActivity: res.data.data
        });
      },
      fail: function (res) {
        // console.log(res, 'res-====');
      }
    });
  }
});