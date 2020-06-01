import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    swiperdata: [],
    catitems: [],
    floordata: []
  },

  onLoad: function(options){
    this.getSwiperdata();
    this.getCatitems();
    this.getFloordata();
  },

  async getSwiperdata() {
    let {message: swiperdata} = await request({
      url: '/home/swiperdata'
    });
    this.setData({
      swiperdata
    });
  },

  async getCatitems() {
    let {message: catitems} = await request({
      url: '/home/catitems'
    });
    this.setData({
      catitems
    });
  },
  
  async getFloordata() {
    let {message: floordata} = await request({
      url: '/home/floordata'
    });
    this.setData({
      floordata
    });
  }
});