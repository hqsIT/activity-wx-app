// pages/share/list.js
const app = getApp();
const https = app.https;
const util = app.util;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allShare: []
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
    this.getList();
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

  getList: function () {
    const _this = this;
    https.GET({
      url: 'share/getList',
      success: function (res) {
        // console.log(res, 'res0----');
        _this.setData({
          allShare: res.data.data
        });
      },
      fail: function (res) {
        // console.log(res, 'res-====');
      }
    });
  },
  create: function () {
    wx.navigateTo({
      url: '/pages/share/create/create'
    });
  },
  showDetial: function (e) {
    var id = e.currentTarget.dataset.id;
    if (!id) {
      return;
    }
    wx.navigateTo({
      url: '/pages/share/detail/detail?id=' + id
    });
  }
})