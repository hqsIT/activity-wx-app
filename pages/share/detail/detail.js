const app = getApp();
const https = app.https;
const util = app.util;

Page({
  data: {
    info: [],
    isFavoured: 0
  },
  onLoad: function (options) {
    const _this = this;
    https.GET({
      url: 'share/detail/' + options.id,
      success: function (res) {
        console.log(res);
        _this.setData({
          info: res.data.data.info,
          isFavoured: res.data.data.isFavoured
        });
      }
    });
  },

  favour: function (e) {
    var id = e.currentTarget.dataset.id;
    const _this = this;
    https.GET({
      url: 'share/favour/' + id,
      success: function (res) {
        console.log(res)
        if (res.data.code) {
          wx.showToast({
            title: res.data.message,
            image: '/image/about.png',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          });
          _this.setData({
            isFavoured: 1
          });
        }
      },
      fail: function () { },
    });
  },

  unFavour: function (e) {
    var id = e.currentTarget.dataset.id;
    const _this = this;
    https.GET({
      url: 'share/unFavour/' + id,
      success: function (res) {
        console.log(res)
        if (res.data.code) {
          wx.showToast({
            title: res.data.message,
            image: '/image/about.png',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          });
          _this.setData({
            isFavoured: 0,
          });
        }
      },
      fail: function () { },
    });
  },

  join: function (e) {
    var id = e.currentTarget.dataset.id;
    const _this = this;
    //调用应用实例的方法获取全局数据
    https.GET({
      url: 'activity/enroll/' + id,
      success: function (res) {
        console.log(res)
        if (res.data.code) {
          wx.showToast({
            title: res.data.message,
            image: '/image/about.png',
            duration: 2000
          });
          _this.setStatus(true, res.data.message);

        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          });
          _this.setStatus(true, '报名成功');
        }
      },
      fail: function () { },
    });
  },
  setStatus: function (status, tip) {
    if (status) {
      this.setData({
        baoMin: 'hide',
        baoMinChengGong: ''
      });
    } else {
      this.setData({
        baoMin: '',
        baoMinChengGong: 'hide',
        tip: tip
      });
    }
  }
});