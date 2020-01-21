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
      url: 'http://localhost:8080/captcha',
      header: {
        'content-type': 'application/json' // 默认值
      },
      responseType: 'ArrayBuffer',
      success(res) {
        console.log(res);
        that.setData({
          captcha: 'data:image/png;base64,' + wx.arrayBufferToBase64(res.data),
        })
        // 存储cookie，
        wx.removeStorageSync('sessionid')
        wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
      }
    })
  },

  /**
   * 登录提交
   */
  bindFormSubmit: function(e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var stuid = e.detail.value.stuid;
    var password = e.detail.value.password;
    var code = e.detail.value.code;
    wx.request({
      url: 'http://localhost:8080/login',
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
        console.log(res);
        if (res.data.code == 0) {
          // 跳转到扫描
          wx.navigateTo({
            url: '../isbn/isbn',
          })

          // 获取分类ID和值
          wx.request({
            url: 'http://localhost:8080/classify',
            header: {
              'content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionid"),
            },
            success: res => {
              console.log(res);
              app.globalData.classifyArray = res.data.data;
            }
          })
          // 获取书架ID和值
          wx.request({
            url: 'http://localhost:8080/bookshelf',
            header: {
              'content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionid"),
            },
            success: res => {
              console.log(res);
              app.globalData.bookshelfArray = res.data.data;
            }
          })
          // 获取用户ID和值
          wx.request({
            url: 'http://localhost:8080/userInfo',
            header: {
              'content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionid"),
            },
            success: res => {
              console.log(res);
              app.globalData.userArray = res.data.data;
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
    })
  },
})