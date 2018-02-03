// pages/share/create/create.js
const app = getApp();
const https = app.https;
const util = app.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
              share_pic: data.data.path
            })
            //do something
          }
        })
      }
    })
  },

  formSubmit: function (e) {
    var _this = this;
    var submitObject = e.detail.value || {};

    wx.showToast({
      title: '正在提交数据...',
      icon: 'loading',
      duration: 10000
    });
    app.getUserInfo(function (userInfo) {

      console.log(submitObject);
      https.POST({
        url: 'share/share',
        params: submitObject,
        success: function (res) {
          console.log(res);
          wx.hideToast();
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000,
            complete: function () {
              wx.switchTab({
                url: '/pages/share/list/list'
              });
            }
          });
        }
      });

    });
  },
})