var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    cIndex: 0,
    bIndex: 0,
    uIndex: 0,

    classifyArray: '',
    bookshelfArray: '',
    userArray: '',
    /**
     * 书的信息
     */
    code: '',
    picSrc: '',
    ISBN: '',
    title: '',
    author: '',
    publisher: '',
    summary: '',
    price: '',
    pubdate: '',
  },
  /**
   * 时间选择更新
   */
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pubdate: e.detail.value
    })
  },
  /**
   * 摘要
   */
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  /**
   * 分类ID选择器
   */
  pickerChangeC: function(e) {
    console.log('分类picker发送改变，携带值为', e.detail.value)
    console.log('分类picker发送改变，具体值为', this.data.classifyArray[e.detail.value].className)
    this.setData({
      cIndex: e.detail.value
    })
  },
  /**
   * 书架ID选择器
   */
  pickerChangeB: function(e) {
    console.log('书架picker发送改变，携带值为', e.detail.value)
    console.log('书架picker发送改变，具体值为', this.data.bookshelfArray[e.detail.value].bsId)
    this.setData({
      bIndex: e.detail.value
    })
  },
  /**
   * 用户ID选择器
   */
  pickerChangeU: function(e) {
    console.log('用户picker发送改变，携带值为', e.detail.value)
    console.log('用户picker发送改变，具体值为', this.data.userArray[e.detail.value].useruuid)
    this.setData({
      uIndex: e.detail.value
    })
  },
  /**
   * form提交
   */
  bindFormSubmit: function(e) {
    e.detail.value.classId = this.data.classifyArray[e.detail.value.classId].classId
    e.detail.value.location = this.data.bookshelfArray[e.detail.value.location].bsId
    e.detail.value.owner = this.data.userArray[e.detail.value.owner].useruuid
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.pubDate.length < 8) {
      wx.showToast({
        icon: 'fail',
        title: "请查看出版时间格式是否正确",
        duration: 2000
      });
    } else {
      wx.request({
        url: 'http://localhost:8080/book',
        data: {
          name: e.detail.value.name,
          author: e.detail.value.author,
          publish: e.detail.value.publish,
          isbn: e.detail.value.isbn,
          introduction: e.detail.value.introduction,
          price: e.detail.value.price,
          pubDate: e.detail.value.pubDate,
          classId: e.detail.value.classId,
          pic: e.detail.value.pic,
          location: e.detail.value.location,
          owner: e.detail.value.owner,
          status: 1,
        },
        method: 'post',
        header: {
          'content-Type': 'application/json',
          'cookie': wx.getStorageSync("sessionid"),
        },
        success: res => {
          console.log(res);
          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.msg,
              duration: 2000
            });
            // 跳转到扫描再次添加
            wx.navigateTo({
              url: '../isbn/isbn',
            })
          }
          if (res.data.code == -1) {
            wx.showToast({
              title: res.data.msg,
              duration: 2000
            });
          }
        },
        fail: res => {
          wx.showToast({
            title: "失败",
            duration: 2000
          });
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var isbn = options.ISBN;
    // 通过全局变量获取值
    this.setData({
      classifyArray: app.globalData.classifyArray,
      bookshelfArray: app.globalData.bookshelfArray,
      userArray: app.globalData.userArray,
    })

    // 默认为GET请求
    wx.request({
      url: 'https://way.jd.com/jisuapi/isbn?isbn=' + isbn + '&appkey=111',//需要申请appkey
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        // console.log(res);
        that.setData({
          code: res.data.code,
          picSrc: res.data.result.result.pic,
          ISBN: res.data.result.result.isbn,
          title: res.data.result.result.title,
          author: res.data.result.result.author,
          publisher: res.data.result.result.publisher,
          summary: res.data.result.result.summary,
          price: res.data.result.result.price,
          pubdate: res.data.result.result.pubdate,
        })
      }
    })

  },
})