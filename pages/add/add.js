var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    date: '2016-09-01',

    cIndex: 1,
    bIndex: 1,
    uIndex: 1,

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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log("扫出来传过来的内容" + options.ISBN);

    // 通过全局变量获取值
    this.setData({
      classifyArray: app.globalData.classifyArray,
      bookshelfArray: app.globalData.bookshelfArray,
      userArray: app.globalData.userArray,
    })

    // 默认为GET请求
    wx.request({
      url: 'http://library.jianzha.xyz/api/book1.json',
      headers: {
        'Content-Type': 'application/json'
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