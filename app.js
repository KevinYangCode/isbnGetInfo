//app.js
App({
  onLaunch: function() {
    // 获取分类ID和值
    wx.request({
      // url: 'http://library.jianzha.xyz/classify',
      url: 'http://localhost:8080/classify',
      headers: {
        'Content-Type': 'application/json'
      },
      success: res => {
        console.log(res);
        this.globalData.classifyArray = res.data.data;
      }
    })
    // 获取书架ID和值
    wx.request({
      // url: 'http://library.jianzha.xyz/bookshelf',
      url: 'http://localhost:8080/bookshelf',
      headers: {
        'Content-Type': 'application/json'
      },
      success: res => {
        console.log(res);
        this.globalData.bookshelfArray = res.data.data;
      }
    })
    // 获取用户ID和值
    wx.request({
      // url: 'http://library.jianzha.xyz/user',
      url: 'http://localhost:8080/userInfo',
      headers: {
        'Content-Type': 'application/json'
      },
      success: res => {
        console.log(res);
        this.globalData.userArray = res.data.data;
      }
    })
  },
  globalData: {
    userInfo: null,
    // 分类，书架，用户列表
    classifyArray: '',
    bookshelfArray: '',
    userArray: '',
  }

})