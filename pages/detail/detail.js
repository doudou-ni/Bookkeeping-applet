// pages/detail/detail.js
const db = wx.cloud.database()
const utils = require('./../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // currentPage: 0,
    money: {
        getMoney: 0,
        useMoney: 0,
    },
    Lists: [],
    date: {
        year: utils.getYear(),
        month: utils.getMonth()
    },
    headerHeight:130,
    scrollHeight:0,
    number:'',
  },
//   //监听用户下拉事件
//   onPullDownRefresh: function () {
//     const that = this;
//     wx.startPullDownRefresh({
//         success: function () {
//             this.setData({
//                 currentPage: 0
//             });
//             that.loadData(that);
//         },
//         complete: function () {
//             wx.stopPullDownRefresh();
//         }
//     });
//   },
//   refreshData() {
//     console.log('refreshData');
//     this.setData({
//         currentPage: this.data.currentPage + 1
//     });
//     this.loadData(this);
// },
  //更改时间 并且更新列表
  bindDateChange: function (e) {
    console.log(e.detail.value)
    var date = e.detail.value;
    var arr = date.split('-');
    this.setData({
      date: {
        year: arr[0],
        month: arr[1]
      }
    });
    this.loadData(this);
  },
  //格式化数据
  formatData(datas) {
    // 最终的格式化后数据
    let finalData = {},
        finalList = [],
        getMoney = 0,
        useMoney = 0;
    let data = Array.from(datas.data);
    // 保存不重复的日期
    let uniqueDate = new Set();
    data.map(item => uniqueDate.add(new Date(item.date).getTime()));
    // 对uniqueDate降序排序, 并保存到 uniqueDates 中
    let uniqueDates = Array.from(uniqueDate).sort(utils.desc);
    uniqueDates.map((item, index) => uniqueDates[index] = utils.formatDate(item));

    // 初始化 finalList
    uniqueDates.map(item => finalList.push({date:item, expense: 0, income: 0,list: []}));
    // console.log(finalList);

    data.map((item) => {
      // 查询当前日期在uniqueDates的下标
      const index = uniqueDates.indexOf(item.date);
      // 计算总支出,总收入
      item.symbol === 0 ? useMoney += item.money : getMoney += item.money;
      // 计算某天的总支出,总收入
      item.symbol === 0 ? finalList[index].expense += item.money : finalList[index].income += item.money;
      // 根据index将数据添加对应date的list中
      finalList[index].list.push(item);
    });
    finalData = {
        list: finalList,
        money: {
          getMoney,
          useMoney,
        }
    };
    return finalData;
  },
  //调用allAccount集合,接收整理数据库的数据
  loadData: function (that) {
    var _this = this
    var num = this.data.number
    let {year, month} = that.data.date;
    let date = year + "-" + month
    //统计集合中共有多少数据
    db.collection('allAccount').where({
      date : db.RegExp({
        regexp: date,//做为关键字进行匹配
        options: 'i',//不区分大小写
      })
    }).count().then((res)=>{
      num = res.total
      _this.setData({
        number:num
      })
    })
    db.collection('allAccount').where({
      date : db.RegExp({
        regexp: date,//做为关键字进行匹配
        options: 'i',//不区分大小写
      })
    }).get().then((res) => {
        let {list, money} = that.formatData(res);
        _this.setData({
            Lists:list,
            money:money,
        })
    }).catch((errMsg) => {
        console.log(errMsg);
    })
    
  },
  //修改账单内容
  deleteBill: function(e){
    console.log(e.currentTarget);
    var that=this
      wx.showModal({
        title: '提示',
        content: '是否删除这条记录',
        // success (res) {
        //   if (res.confirm) {
        //     db.collection('allAccount').where({
        //       _id: e.currentTarget.dataset.id,
        //     }).remove().then(res=>{
        //         that.loadData(that)
        //       })
        //   } else if (res.cancel) {
        //     console.log('用户点击取消')
        //   }
        // }
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad(options) {
    // wx.showLoading({
    //   title: '数据努力加载中',
    // });
    var that = this
    var headerHeight = this.data.headerHeight
    //自适应高度
    wx.getSystemInfo({
      success: (res) => {
        // console.log(res.windowHeight)
        that.setData({
          scrollHeight: res.windowHeight*750/res.windowWidth-headerHeight
        })
      },
      fail: (res) => {
        console.log("自适应高度失败");
      },
      complete: (res) => {},
    })
    this.loadData(this);
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
    this.loadData(this);
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