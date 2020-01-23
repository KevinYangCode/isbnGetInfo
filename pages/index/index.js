//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    captcha: '',
  },
  onLoad: function() {
    this.reqCaptcha();
  },


  /**
   * 获取验证码事件
   */
  reqCaptcha: function(e) {
    var that = this;
    // 通过请求获取图片，带cookie（可以直接把url给src，但这样不会拿到cookie）
    wx.request({
      url: 'https://library.jianzha.xyz/captcha',
      header: {
        'content-type': 'application/json'
      },
      responseType: 'ArrayBuffer',
      success(res) {
        that.setData({
          captcha: 'data:image/png;base64,' + wx.arrayBufferToBase64(res.data),
        })
        // 存储cookie，
        wx.removeStorageSync('sessionid')
        wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
      },
      fail(res) {
        wx.showToast({
          title: '接口调用失败！',
          duration: 2000
        })
      }
    })
  },

  /**
   * 登录提交
   */
  bindFormSubmit: function(e) {
    var that = this;
    var stuid = e.detail.value.stuid;
    var password = e.detail.value.password;
    var code = e.detail.value.code;
    wx.request({
      url: 'https://library.jianzha.xyz/login',
      data: {
        stuid: stuid,
        password: password,
        code: code
      },
      method: 'post',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid"),
      },
      success(res) {
        if (res.data.code == 0) {
          // 跳转到扫描
          wx.navigateTo({
            url: '../isbn/isbn',
          })

          // 获取分类ID和值
          wx.request({
            url: 'https://library.jianzha.xyz/classify',
            header: {
              'content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionid"),
            },
            success: res => {
              app.globalData.classifyArray = res.data.data;
            },
            fail(res) {
              wx.showToast({
                title: '接口调用失败！',
                duration: 2000
              })
            }
          })
          // 获取书架ID和值
          wx.request({
            url: 'https://library.jianzha.xyz/bookshelf',
            header: {
              'content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionid"),
            },
            success: res => {
              app.globalData.bookshelfArray = res.data.data;
            },
            fail(res) {
              wx.showToast({
                title: '接口调用失败！',
                duration: 2000
              })
            }
          })
          // 获取用户ID和值
          wx.request({
            url: 'https://library.jianzha.xyz/userInfo',
            header: {
              'content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionid"),
            },
            success: res => {
              app.globalData.userArray = res.data.data;
            },
            fail(res) {
              wx.showToast({
                title: '接口调用失败！',
                duration: 2000
              })
            }
          })

          wx.showToast({
            title: '登录成功',
            duration: 2000
          })
        }
        if (res.data.code == -1) {
          wx.showToast({
            title: res.data.msg
          });
          // 登录失败，刷新验证码
          that.reqCaptcha();
        }
      },
      fail(res) {
        wx.showToast({
          title: '接口调用失败！',
          duration: 2000
        })
      }
    })
  },
})