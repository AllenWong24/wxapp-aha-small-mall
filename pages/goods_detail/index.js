import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    goodsDetail: {},
    goodsIntroduce: '',
    isCollect: false
  },

  // 接口要的参数
  _queryParams:{
    goods_id: ''
  },

  onLoad: function (options) {
    this._queryParams.goods_id = options.goods_id || '';
    this.getGoodsDetail();
  },

  async getGoodsDetail() {
    let { message: goodsDetail } = await request({
      url: '/goods/detail',
      data: this._queryParams
    });
    const collection = wx.getStorageSync('Collection') || [];
    const isCollect = collection.some(v => v.goods_id === goodsDetail.goods_id);
    this.setData({
      goodsDetail,
      isCollect,
      goodsIntroduce: goodsDetail.goods_introduce.replace(/\.webp/g, '.jpg'),
    })
  },

  previewImage(e) {
    const urls = this.data.goodsDetail.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },

  handleAddCart() {
    const shoppingCart = wx.getStorageSync('ShoppingCart') || [];
    const index = shoppingCart.findIndex(v => v.goods_id === this.data.goodsDetail.goods_id);
    if (index !== -1) {
      shoppingCart[index].count++;
    } else {
      let goods_iamge = '';
      if (this.data.goodsDetail.pics.length === 0) {
        goods_iamge = 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg';
      } else {
        goods_iamge = this.data.goodsDetail.pics[0].pics_mid;
      }
      const cartItem = {
        goods_id: this.data.goodsDetail.goods_id,
        goods_name: this.data.goodsDetail.goods_name,
        goods_price: this.data.goodsDetail.goods_price,
        goods_iamge,
        count: 1
      };
      shoppingCart.push(cartItem);
    }
    wx.setStorageSync('ShoppingCart', shoppingCart);
    wx.showToast({
      title: '加车成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    });
  },

  handleCollecting() {
    const collection = wx.getStorageSync('Collection') || [];
    const index = collection.findIndex(v => v.goods_id === this.data.goodsDetail.goods_id);
    let isCollect = this.data.isCollect;
    if (index !== -1) {
      collection.splice(index, 1);
      wx.showToast({
        title: '删除成功',
        icon: 'none',
      });
      isCollect = false;
    } else {
      let goods_iamge = '';
      if (this.data.goodsDetail.pics.length === 0) {
        goods_iamge = 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg';
      } else {
        goods_iamge = this.data.goodsDetail.pics[0].pics_mid;
      }
      const collectionItem = {
        goods_id: this.data.goodsDetail.goods_id,
        goods_name: this.data.goodsDetail.goods_name,
        goods_price: this.data.goodsDetail.goods_price,
        goods_iamge
      };
      collection.push(collectionItem);
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
      });
      isCollect = true;
    }
    wx.setStorageSync('Collection', collection);
    this.setData({
      isCollect
    });
  },

  handleBuy() {
    wx.showToast({
      title: '个人项目,开心就好',
      icon: 'none',
      duration: 2000
    })
  }
})