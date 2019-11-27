// pages/user/index.js
Page({

  data: {
    userInfo: {},
    collectionNum: 0
  },

  onShow: function () {
    const userInfo = wx.getStorageSync('UserInfo') || {};
    const collection = wx.getStorageSync('Collection') || [];
    this.setData({
      userInfo,
      collectionNum: collection.length
    })
  },

  bindGetUserInfo(e) {
    const info = e.detail.userInfo;
    if (info) {
      let userInfo = {
        nickName: info.nickName,
        icon: info.avatarUrl
      }
      wx.setStorageSync('UserInfo', userInfo);
      this.setData({
        userInfo
      })
    }
  }
})