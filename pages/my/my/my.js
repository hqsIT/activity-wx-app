var app = getApp();
Page({
    data: {
        userInfo: {},
        userName: 'kingwell',
        signature: ''
    },
    goToList: function() {
        wx.navigateTo({
            url: '/pages/my/my-list/my-list'
        });
    },
    goToJoinList: function () {
      wx.navigateTo({
        url: '/pages/my/my-join-list/my-join-list'
      });
    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: '我'
        });
        var _this = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            _this.setData({
                nickName: userInfo.nickName,
                userInfo: userInfo
            });
        });
    }
});