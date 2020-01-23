//获取应用实例  
var app = getApp()
Page({
  data: {
    result: "",
  },

  getScancode: function() {
    var that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: '../add/add?ISBN=' + res.result
        })
        var result = res.result
        
        that.setData({
          result: result
        })

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        if (res.errMsg == 'scanCode:fail') {
          wx.showToast({
            title: '扫码失败'
          });
        }
      }
    })
  },

  logout: function() {
    var that = this;
    wx.request({
      url: 'https://library.jianzha.xyz/shiro/logout',
      header: {
        'content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionid"),
      },
      success(res) {
        wx.navigateTo({
          url: '../index/index',
        })
      },
      fail(res) {
        wx.showToast({
          title: '接口调用失败！',
          duration: 2000
        })
      }
    })
  }
})