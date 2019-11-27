import { getSetting, chooseAddress, openSetting, showModal ,showToast} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    address: '',
    shoppingCart: [],
    amount: 0,
    total: 0,
    allChecked: false,
  },

  onShow: function () {
    this.setAmountAndTotal();
    this.setData({
      address: wx.getStorageSync("Address") || false,
      shoppingCart: wx.getStorageSync("ShoppingCart") || []
    })
  },

  setAmountAndTotal() {
    let amount = 0;
    let total = 0;
    let shoppingCart = wx.getStorageSync("ShoppingCart") || [];
    shoppingCart.forEach(v => {
      if (v.checked) {
        amount += v.goods_price * v.count;
        total++;
      }
    });
    this.setData({
      amount,
      total
    });
  },

  async handleChooseAddress(e) {
    try {
      const setting = await getSetting();
      const scopeAddress = setting.authSetting['scope.address'];
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("Address", address);
    } catch (error) {
      console.error(error);
    }
  },

  checkboxItemChange(e) {
    const goodsId = e.currentTarget.dataset.id;
    let shoppingCart = wx.getStorageSync("ShoppingCart");
    const index = shoppingCart.findIndex(v => v.goods_id === goodsId);
    shoppingCart[index].checked = !shoppingCart[index].checked;
    wx.setStorageSync('ShoppingCart', shoppingCart);
    this.setAmountAndTotal();
    this.setData({
      shoppingCart
    });
  },

  checkboxAllChecked() {
    let allChecked = !this.data.allChecked;
    let shoppingCart = wx.getStorageSync("ShoppingCart");
    shoppingCart.forEach(v => {
      v.checked = allChecked
    });
    wx.setStorageSync('ShoppingCart', shoppingCart);
    this.setAmountAndTotal();
    this.setData({
      shoppingCart,
      allChecked
    });
  },

  handleNumEdit(e) {
    const goodsId = e.currentTarget.dataset.id;
    const operation = e.currentTarget.dataset.operation;
    let shoppingCart = wx.getStorageSync("ShoppingCart");
    const index = shoppingCart.findIndex(v => v.goods_id === goodsId);
    shoppingCart[index].count += parseInt(operation);
    if (shoppingCart[index].count === 0) {
      let that = this;
      wx.showModal({
        title: '注意',
        content: '是否要删除商品？',
        success (res) {
          if (res.confirm) {
            shoppingCart.splice(index, 1);
          } else if (res.cancel) {
            shoppingCart[index].count++;
          }
          wx.setStorageSync('ShoppingCart', shoppingCart);
          that.setAmountAndTotal();
          that.setData({
            shoppingCart
          });
        }
      })
    }
    wx.setStorageSync('ShoppingCart', shoppingCart);
    this.setAmountAndTotal();
    this.setData({
      shoppingCart
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