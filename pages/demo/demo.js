// pages/demo/demo.js
const db = wx.cloud.database();
const utils = require('./../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billType:['支出','收入'],
    list:[
      [
        {text:'聚会活动',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/聚会活动.png'},
        {text:'饮料',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/饮料.png'},
        {text:'游戏',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/游戏.png'},
        {text:'交通',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/交通.png'},
        {text:'住房',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/住房.png'},
        {text:'旅游',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/旅游.png'},
        {text:'购物',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/购物.png'},
        {text:'运动',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/运动.png'},
        {text:'数码',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/数码.png'},
        {text:'学习',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/学习.png'},
        {text:'宠物',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/宠物.png'},
        {text:'办工',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/办工.png'},
        {text:'捐赠',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/捐赠.png'},
        {text:'礼金',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/礼金.png'},
        {text:'通信',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/通信.png'}
      ]
      ,
      [
        {text:'工资',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/工资.png'},
        {text:'兼职',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/兼职.png'},
        {text:'奖学金',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/奖学金.png'},
        {text:'红包',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/红包.png'},
        {text:'彩票',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/彩票.png'},
        {text:'股票',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/股票.png'},
        {text:'基金',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/基金.png'},
        {text:'理财',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/理财.png'},
        {text:'自媒体',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/媒体.png'},
        {text:'暑期工',icon:'cloud://cloud1-5giuvzym8eb1824b.636c-cloud1-5giuvzym8eb1824b-1311122589/img/暑期工.png'}
      ]
    ],
    payment:['微信','支付宝','银行卡','校园卡','现金','其他'],
    swiperHeight:'',
    useHeight:'',
    headerHeight: 90,
    bill_id:0,
    kind_id:-1,
    index:0,
    current:'',
    show_input:false,
    input_value:'',
    hidebox:false,
    money:'',
    fixerHeight: 530,
    date: utils.getDate(),
    currentDate: utils.getDate(),
    formbox:false,
  },
  //清空所有值
  clearValue: function(){
    this.setData({
      input_value:'',
      money:'',
      kind_id: -1,
      date:this.data.currentDate
    })
  },
  //关闭账单输入框
  closeForm: function(){
    this.clearValue()
    var useHeight = this.data.useHeight
    var headerHeight = this.data.headerHeight
    //自适应高度
    this.setData({
      swiperHeight: useHeight-headerHeight,
      formbox: false,
    })
  },
  
  // 点击导航栏改变swiper
  changeBillid:function(e){
    var id = e.currentTarget.dataset.index
    this.setData({
      bill_id: id,
      current:id,
    })
  },
  // 打开自定义类别输入框
  openkind:function(){
    this.closeForm()
    this.setData({
      show_input:true,
      hidebox: true,
      formbox:false
    })
  },
  //点击弹出窗口外的其他区域 弹窗关闭
  hidebox: function(){
    this.closeForm()
    this.setData({
      hidebox: false,
      show_input:false,
    })
  },
  //点击弹窗内区域，保持弹窗不关闭
  keepbox:function(){
    this.setData({
      hidebox:true
    })
  },
  // // 关闭弹窗
  // closekind: function(){
  //   this.setData({
  //     show_input:false,
  //     hidebox: false,
  //     input_value:''
  //   })
  // },

  // 获取输入的类别
  getInputValue:function(e){
    // console.log(e.detail.value);
    this.setData({
      input_value:e.detail.value
    })
  },
  //完成按钮 添加自定义类别
  addkind: function(){
    var list = this.data.list
    var id = this.data.bill_id
    var value = this.data.input_value
    if(value!=''){
      list[id].push({text:value})
      // console.log(this.data.list);
      this.setData({
        show_input:false,
        hidebox: false,
        input_value:'',
        list : list
      })
    }
    // 输入空值 提醒
    else{
      wx.showToast({
        title:'输入空值',
        icon:'error',
        duration:2000
      })
    }
  },
  // 滑动swiper改变导航栏
  changeCurrent: function(e){
    this.closeForm()
    this.setData({
      bill_id: e.detail.current,
      current: e.detail.current,
    })
  },
  // 选中类别 弹出账单输入框
  selectedkind: function(e){
    var useHeight = this.data.useHeight
    var headerHeight = this.data.headerHeight
    var fixerHeight = this.data.fixerHeight
    this.setData({
      swiperHeight: useHeight-headerHeight-fixerHeight,
      kind_id: e.currentTarget.dataset.index,
      formbox: true,
      hidebox: true,
      show_input:false
    })    
  },
  //长按 删除选中的类别
  removekind: function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var list = this.data.list
    var id = this.data.bill_id
    wx.showModal({
      title: '提示',
      content: '是否要删除 “'+list[id][index].text +'” 吗？',
      success: function(res){
        // 如果用户点击确定则进行删除 否则取消删除
        if(res.confirm){
          list[id].splice(index,1)
          wx.showToast({
            title: '删除成功',
            icon:'none',
            duration:2000
          })
          that.setData({
            list: list
          })
        }
      },
      fail: function(res){
        wx.showToast({
          title: '删除失败',
          icon:'error',
          duration:2000
        })
      }
    })
  },
  //获取金额数值
  getNumber:function(e){
    // console.log(e.detail.value);
    this.setData({
      money:e.detail.value
    })
  },
  //更改分类类别
  bindKindChange: function(e){
    // console.log(e.detail.value)
    this.setData({
      kind_id: e.detail.value
    })
  },
  //更改支付方式
  bindPaymentChange: function(e){
    // console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //更改时间
  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //提交表单数据
  formSubmit: function (res) {
    console.log(res.detail.value)
    var that = this
    var money=res.detail.value.money
    var kind=res.detail.value.kind
    var payment=res.detail.value.payment
    var date=res.detail.value.date
    var note=res.detail.value.note
    var bill_id=this.data.bill_id
    var icon = this.data.list[bill_id][this.data.kind_id].icon
    if (money == '') {
      wx.showModal({
        title:'提示',
        content:'请输入金额'
      })
      return null
    }
    //正则表达式 检测所输入的金额是否正确
    const exp = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    // exp.test(cost) 返回的是布尔值
    // console.log(exp.test(cost))
    if (!exp.test(money)) {
      wx.showModal({
        title:'提示',
        content:'请输入正确的金额',
      })
      // Dialog.alert({
      //   message:'请输入正确的金额',
      // }).then(() => {
      //   // on close
      // });
      return null
    }
    else{
      wx.showLoading({
        title: '保存中...',
        mask:true
      })
      db.collection("allAccount").add({
        data:{
          money:Number(money),
          kind:kind,
          payment:payment,
          date:date,
          note:note,
          symbol:Number(bill_id),
          icon:icon
        },
      }).then(result=>{
        wx.hideLoading()
        console.log('form发生了submit事件，携带数据为：', res.detail.value)
        that.closeForm()
        wx.switchTab({
          url: '/pages/detail/detail',
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    var headerHeight = this.data.headerHeight
    //自适应高度
    wx.getSystemInfo({
      success: (res) => {
        // console.log(res.windowHeight)
        that.setData({
          swiperHeight: res.windowHeight*750/res.windowWidth-headerHeight,
          useHeight: res.windowHeight*750/res.windowWidth
        })
      },
      fail: (res) => {
        console.log("自适应高度失败");
      },
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})