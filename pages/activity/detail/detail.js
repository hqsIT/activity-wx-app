const app = getApp();
const https = app.https;
const util = app.util;

Page({
  data: {
    disabled: true,
    tip: '已经报名了'
  },
  onLoad: function (options) {
    const _this = this;
    https.GET({
      url: 'activity/detail/' + options.id,
      success: function (res) {
        console.log(res);
        _this.setData(res.data.data);
        if (res.data.data.activity_status == 0) {
          _this.setStatus(true, res.data.data.tip);
        }
      }
    });
    _this.setStatus(false);
  },
  tel: function (e) {
    var phoneNumber = e.currentTarget.dataset.tel;

    if (!phoneNumber) {
      return;
    }
    wx.makePhoneCall({
      phoneNumber: phoneNumber
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