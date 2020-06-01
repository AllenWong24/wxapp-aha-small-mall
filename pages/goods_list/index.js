import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    tabsTitle: ['综合', '销量', '价格'],
    goodsList: []
  },

  // 接口要的参数
  _queryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  _goodsTotal: 0,

  onLoad: function (options) {
    this._queryParams.cid = options.cid || '';
    this._queryParams.query = options.query || '';
    this.getGoodsList();
  },

  async getGoodsList() {
    let { message } = await request({
      url: '/goods/search',
      data: this._queryParams
    });
    this._goodsTotal = message.total;
    this.setData({
      goodsList: [...this.data.goodsList,...message.goods]
    })
  },

  handleContentChange() {
    this.refreshGoodsList();
  },

  onPullDownRefresh() {
    this.refreshGoodsList();
  },

  onReachBottom() {
    if (this._queryParams.pagenum * this._queryParams.pagesize >= this._goodsTotal) {
      wx.showToast({
        title: '已经没有下一页数据',
        icon: 'none',
        duration: 1000
      });
      
    } else {
      this._queryParams.pagenum++;
      this.getGoodsList();
    }
  },

  async refreshGoodsList() {
    this.setData({
      goodsList:[]
    });
    this._queryParams.pagenum = 1;
    await this.getGoodsList();
    wx.stopPullDownRefresh()
  }
})