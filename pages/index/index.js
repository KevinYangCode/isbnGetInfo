//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // captcha: 'http://library.jianzha.xyz/captcha',
    captcha: 'http://localhost:8080//captcha',
  },
  onLoad: function() {
    var that = this;
  },

  reqCaptcha: function(e) {
    console.log("点击");
    this.setData({
      // captcha: 'http://library.jianzha.xyz/captcha?' + new Date(),
      captcha: 'http://localhost:8080/captcha?' + new Date(),
    })
  },

  /**
   * 登录提交
   */
  bindFormSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var stuid =  e.detail.value.stuid;
    var password = e.detail.value.password;
    var code = e.detail.value.code;
    console.log("stuid:" + stuid);
    console.log("password:" + password);
    console.log("code:" + code);
    wx.request({
      // url: 'http://library.jianzha.xyz/login',
      url: 'http://localhost:8080/login',
      data: {
        stuid: stuid,
        password: password,
        code: code
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '../isbn/isbn',
          })
        }
      }
    })
  },

})