import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    leftMenu: [],
    rightContent: [],
    scrollTop: 0,
    currentIndex: 0
  },

  onLoad: function (options) {
    let categories = wx.getStorageSync('Categories');
    if (this.isCategoriesLegal(categories)) {
      this.setCategories(categories.data, 0);
    } else {
      this.getCategories();
    }
  },
  
  isCategoriesLegal(categories) {
    // 空 或 数据超过10分钟
    if (!categories || (Date.now() - categories.time) > (1000 * 60 * 10)) {
      return false;
    }

    return true;
  },

  async getCategories() {
    let {message: categories} = await request({
      url: '/categories'
    });
    wx.setStorageSync('categories', {time: Date.now(), data:categories});
    this.setCategories(categories, 0);
  },

  setCategories(categories, contentIndex) {
    let leftMenu = categories.map(v => v.cat_name);
    let rightContent = categories[contentIndex].children;
    this.setData({
      leftMenu,
      rightContent
    });
  },

  handleTap(e) {
    const { index } = e.currentTarget.dataset;
    let categories = wx.getStorageSync('categories');
    this.setCategories(categories.data, index);
    this.setData({
      scrollTop: 0,
      currentIndex: index
    });
  }
})