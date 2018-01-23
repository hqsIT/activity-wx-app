 var app = getApp();

 var getList = function() {
   var _this = this;
   wx.request({
     url: app.globalData.domain + 'activity/getLists',
     header: {
       'cookie': 'laravel_session='+wx.getStorageSync('authorization')
     },
     data: {
       
     },
     method: 'GET',
     success: function(res) {
       console.log(res);
       _this.setData({
         allActivity: res.data.data
       });
        wx.hideNavigationBarLoading();
     }
   });
 };
 Page({
   data: {
     scrollTop: 100
   },
   upper: function(e) {},
   lower: function(e) {},
   scroll: function(e) {},
   tap: function(e) {},
   tapMove: function(e) {
     this.setData({
       scrollTop: this.data.scrollTop + 10
     })
   },
   detial: function(e) {
     var id = e.target.dataset.id;
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
   onPullDownRefresh: function() {
     getList.call(this);
   },
   onLaunch:function(){
     
   },
   onShow: function() {
     getList.call(this);
     wx.showNavigationBarLoading();
   },
   onReady: function() {
     
   },
   onLoad: function() {
    //  getList.call(this);
   }
 });