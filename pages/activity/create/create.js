var app = getApp();
var _id = '';
var getActivityTypes = function () {
  var _this = this;
  wx.request({
    url: app.globalData.domain + 'activity/getTypes',
    data: {

    },
    method: 'GET',
    success: function (res) {
      console.log(res);
      _this.setData({
        activityTypes: res.data.data
      });
      wx.hideNavigationBarLoading();
    }
  });
};
var formatNumber = function (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
Page({
  data: {
    title: '',
    number: '',
    address: '',
    cover: '',
    date: '',
    start_time: '',
    end_time: '',
    submitStatus: false,
    activityTypes: []
  },
  bindStartTimeChange: function (e) {
    this.setData({
      start_time: e.detail.value
    });
  },
  onShow: function (option) {

    getActivityTypes.call(this);
    console.log(this.data.date);
    if (this.data.date == '') {
      var newDate = new Date();
      var now_time = [newDate.getHours(), newDate.getMinutes()].map(formatNumber).join(':')
      this.setData({
        start_time: now_time,
        end_time: now_time,
        date: [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].map(formatNumber).join('-')
      });
    }
    wx.setNavigationBarTitle({
      title: '创建报名'
    });
  },
  bindEndTimeChange: function (e) {
    this.setData({
      end_time: e.detail.value
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
  },
  goToBack: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  radioChange: function (e) {
    this.setData({
      type: e.detail.value
    });
  },
  selectCover: function (e) {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        wx.uploadFile({
          url: app.globalData.domain + 'upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(res);
            let data = JSON.parse(res.data);
            _this.setData({
              cover: data.data.path
            })
            //do something
          }
        })
      }
    })
  },
  selectMap: function (e) {
    var _this = this;
    var latitude = e.target.dataset.latitude || '';
    var longitude = e.target.dataset.longitude || '';

    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      success: function (e) {
        console.log('打开地图');
        console.log(e);
        wx.chooseLocation({
          success: function (e) {
            console.log('选择地图');
            console.log(e);
            _this.setData({
              latitude: e.latitude,
              longitude: e.longitude,
              addressName: e.address
            });
          }
        });
      },
      fail: function () { },
      complete: function () { }
    });
  },
  formSubmit: function (e) {
    var _this = this;
    var submitObject = e.detail.value || {};
    var status = true;

    for (var key in submitObject) {
      console.log(key + '=' + submitObject[key]);
      if (!submitObject[key]) {
        status = false;
      }
    }
    console.log(status);

    if (status) {
      wx.showToast({
        title: '正在提交数据...',
        icon: 'loading',
        duration: 10000
      });
      app.getUserInfo(function (userInfo) {

        console.log(submitObject);
        wx.request({
          url: app.globalData.domain + 'activity/create',
          data: submitObject,
          method: 'post',
          header: {
            'cookie': 'laravel_session=' + wx.getStorageSync('authorization')
          },
          success: function (res) {
            console.log(res);
            wx.hideToast();
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000,
              complete: function () {
                wx.switchTab({
                  url: '../all/all'
                });
              }
            });
          }
        });

      });


    } else {
      wx.showModal({
        title: '提交数据',
        content: '数据填写不完整',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }

  },
  onLoad: function (option) {

    _id = option._id;

    this.setData({
      imageUrl: option.id,
      theme: option.theme
    });
  }

});